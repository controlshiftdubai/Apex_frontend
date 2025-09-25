export interface ScrambleDataType {
  imageUrl: string;
  heading: string;
  subHeading: string;
  description: string;
  buttonText: string;
}

export const scrambleData: ScrambleDataType[] = [
  {
    heading: "$15M",
    subHeading: "Seed Funded",
    buttonText: "Explore our tech projects",
    description:
      "We believe design should be part of your story from the beginning. Our work with a VR start-up at pre-seed was key in the brand securing more than $15 million. We held workshops to define a strategy, iterated and refined concepts, and created cutting-edge visuals and prototypes. By investing in design, the entrepreneurs were empowered to successfully share their game-changing vision with investors.",
    imageUrl:
      "https://cdn.layerdesign.com/wp-content/uploads/2023/02/Impact-Unai-Render.jpg.webp",
  },
  {
    heading: "$3.1M",
    subHeading: "Crowdfunded",
    buttonText: "Discover VITURE One",
    description:
      "We know how to connect with potential backers to raise funding and generate excitement before a launch. We collaborated with start-up Viture on the Kickstarter campaign for the Viture One smart glasses we designed, including the creation of photorealistic visuals, prototypes, and behind-the-scenes videos. This was key in the brand raising more than $3.1 million from more than 5,000 backers to set a new record in the sector.",
    imageUrl:
      "https://cdn.layerdesign.com/wp-content/uploads/2023/01/viture.jpg.webp",
  },
  {
    heading: "100M",
    subHeading: "Impressions",
    buttonText: "Discover Balance",
    description:
      "We have the connections and the know-how to get your product in front of the right audience to drive results. When we designed the Beosound Balance speaker for Bang & Olufsen, we helped create a PR launch strategy – including art direction, communications, and videos. This holistic approach resulted in extensive coverage in leading print and online publications, gaining more than 100 million digital impressions.",
    imageUrl:
      "https://cdn.layerdesign.com/wp-content/uploads/2023/01/layer-100m-impressions.jpg.webp",
  },
  {
    heading: "262K",
    subHeading: "Exhibition Visitors",
    buttonText: "Discover Connectivity",
    description:
      "We understand inspiring experiences drive engagement. We work with our partners to create immersive installations and exhibitions that attract new audiences and start conversations. When launching Connectivity Concept for Deutsche Telekom Design, we designed a dynamic installation for Milan Design Week that celebrated the brand’s values and attracted more than 262,000 visitors in a single week.",
    imageUrl:
      "https://cdn.layerdesign.com/wp-content/uploads/2023/02/DT_Case_Study_3176x1416.jpg.webp",
  },
];


export const navOrder = ["Impact", "Collaboration", "Press"];