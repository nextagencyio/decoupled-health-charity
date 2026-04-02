// Tagged template that returns the query string
const gql = (strings: TemplateStringsArray, ...values: any[]) => strings.reduce((a, s, i) => a + s + (values[i] || ''), '')

// Homepage query with stats
export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription {
          processed
        }
        statsItems {
          ... on ParagraphStatItem {
            id
            number
            label
          }
        }
        featuredCampaignsTitle
        ctaTitle
        ctaDescription {
          processed
        }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

// Campaigns
export const GET_CAMPAIGNS = gql`
  query GetCampaigns($first: Int = 20) {
    nodeCampaigns(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeCampaign {
          body {
            processed
            summary
          }
          healthArea {
            ... on TermInterface {
              id
              name
            }
          }
          campaignType {
            ... on TermInterface {
              id
              name
            }
          }
          goalAmount
          raisedAmount
          deadline {
            timestamp
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_CAMPAIGN_BY_PATH = gql`
  query GetCampaignByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeCampaign {
            id
            title
            path
            body {
              processed
            }
            healthArea {
              ... on TermInterface {
                id
                name
              }
            }
            campaignType {
              ... on TermInterface {
                id
                name
              }
            }
            goalAmount
            raisedAmount
            deadline {
              timestamp
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// Research Projects
export const GET_RESEARCH_PROJECTS = gql`
  query GetResearchProjects($first: Int = 20) {
    nodeResearchProjects(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeResearchProject {
          body {
            processed
            summary
          }
          healthArea {
            ... on TermInterface {
              id
              name
            }
          }
          leadResearcher
          institution
          fundingAmount
          startDate {
            timestamp
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_RESEARCH_PROJECT_BY_PATH = gql`
  query GetResearchProjectByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeResearchProject {
            id
            title
            path
            body {
              processed
            }
            healthArea {
              ... on TermInterface {
                id
                name
              }
            }
            leadResearcher
            institution
            fundingAmount
            startDate {
              timestamp
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// Events
export const GET_EVENTS = gql`
  query GetEvents($first: Int = 20) {
    nodeEvents(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeEvent {
          body {
            processed
            summary
          }
          eventDate {
            timestamp
          }
          endDate {
            timestamp
          }
          location
          eventType {
            ... on TermInterface {
              id
              name
            }
          }
          registrationUrl
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_EVENT_BY_PATH = gql`
  query GetEventByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeEvent {
            id
            title
            path
            body {
              processed
            }
            eventDate {
              timestamp
            }
            endDate {
              timestamp
            }
            location
            eventType {
              ... on TermInterface {
                id
                name
              }
            }
            registrationUrl
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// News
export const GET_NEWS = gql`
  query GetNews($first: Int = 20) {
    nodeNewsItems(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeNews {
          body {
            processed
            summary
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
          category {
            ... on TermInterface {
              id
              name
            }
          }
          featured
        }
      }
    }
  }
`

export const GET_NEWS_BY_PATH = gql`
  query GetNewsByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeNews {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
            category {
              ... on TermInterface {
                id
                name
              }
            }
            featured
          }
        }
      }
    }
  }
`

// Generic route query for pages and other content
export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            id
            title
            body {
              processed
            }
          }
          ... on NodeCampaign {
            id
            title
            path
            body {
              processed
            }
            healthArea {
              ... on TermInterface {
                id
                name
              }
            }
            campaignType {
              ... on TermInterface {
                id
                name
              }
            }
            goalAmount
            raisedAmount
            deadline {
              timestamp
            }
            image {
              url
              alt
              width
              height
            }
          }
          ... on NodeResearchProject {
            id
            title
            path
            body {
              processed
            }
            healthArea {
              ... on TermInterface {
                id
                name
              }
            }
            leadResearcher
            institution
            fundingAmount
            startDate {
              timestamp
            }
            image {
              url
              alt
              width
              height
            }
          }
          ... on NodeEvent {
            id
            title
            path
            body {
              processed
            }
            eventDate {
              timestamp
            }
            endDate {
              timestamp
            }
            location
            eventType {
              ... on TermInterface {
                id
                name
              }
            }
            registrationUrl
          }
          ... on NodeNews {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
            }
            category {
              ... on TermInterface {
                id
                name
              }
            }
            featured
          }
          ... on NodeHomepage {
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            statsItems {
              ... on ParagraphStatItem {
                id
                number
                label
              }
            }
            featuredCampaignsTitle
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
        }
      }
    }
  }
`

// Featured campaigns for homepage (limit to 3)
export const GET_FEATURED_CAMPAIGNS = gql`
  query GetFeaturedCampaigns {
    nodeCampaigns(first: 3, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeCampaign {
          healthArea {
            ... on TermInterface {
              id
              name
            }
          }
          goalAmount
          raisedAmount
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

// Featured news for homepage
export const GET_FEATURED_NEWS = gql`
  query GetFeaturedNews {
    nodeNewsItems(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeNews {
          body {
            summary
          }
          image {
            url
            alt
            variations(styles: [MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
          category {
            ... on TermInterface {
              id
              name
            }
          }
          featured
        }
      }
    }
  }
`

// Upcoming events for homepage
export const GET_UPCOMING_EVENTS = gql`
  query GetUpcomingEvents {
    nodeEvents(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeEvent {
          eventDate {
            timestamp
          }
          location
          eventType {
            ... on TermInterface {
              id
              name
            }
          }
        }
      }
    }
  }
`
