module.exports = {
  siteMetadata: {
    title: `HelpDefeatCOVID.com`,
    description: `You can help us defeat this COVID pandemic. Please contribute a bit and we shall win over it.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `HealthIntel.ai`,
        short_name: `HealthIntel`,
        description: "We help people around the world use their medical history, symptoms and vital signs that include heart rate, temperature and blood oxygen saturation to determine likelihood of COVID-19.",
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/HI.png`
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
