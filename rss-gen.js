require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const getAllPostsXmlData = async () => {
  const query = `
    query AllPosts {
      posts(where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            id
            date
            title
            slug
            content
            excerpt
          }
        }
      }
    }
    `;
  const headers = { 'Content-Type': 'application/json' };
  const allPosts = await axios({
    method: 'post',
    url: process.env.WP_API_URL,
    headers,
    data: JSON.stringify({ query })
  });

  return allPosts.data.data.posts.edges;
};

const blogPostsRssXml = blogPosts => {
  let latestPostDate = '';
  let rssItemsXml = '';
  blogPosts.forEach(({ node }) => {
    const post = node;
    const postDate = Date.parse(post.date);

    // Remember to change this URL to your own!
    const postHref = `https://myamazingwebsite.com/blog/${post.slug}`;

    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }

    rssItemsXml += `
      <item>
        <title><![CDATA[ ${post.title} ]]></title>
        <link>${postHref}</link>
        <pubDate>${post.date}</pubDate>
        <guid isPermaLink="false">${postHref}</guid>
        <description>
        <![CDATA[ ${post.excerpt} ]]>
        </description>
        <content:encoded>
          <![CDATA[ ${post.content} ]]>
        </content:encoded>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate
  };
};

const getRssXml = blogPosts => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);

  // Edit the '<link>' and '<description>' data here to reflect your own website details!
  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title><![CDATA[ Frontend development articles by Rob Kendal ]]></title>
        <link>https://myamazingwebsite.com</link>
        <description>
          <![CDATA[ A description about your own website that really shows off what it's all about ]]>
        </description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

async function generateRSS() {
  const allBlogPostData = await getAllPostsXmlData();
  const processedXml = getRssXml(allBlogPostData);

  const staticOutputPath = path.join(process.cwd(), 'out');

  fs.writeFile(`${staticOutputPath}/rss.xml`, processedXml, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('File written successfully');
    }
  });
}

// kick it all off
generateRSS();
