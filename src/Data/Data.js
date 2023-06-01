
import img1 from "../assets/imgs/img1.png";
import img2 from "../assets/imgs/img2.png";
import img3 from "../assets/imgs/img3.png";


// categories data
export const categoriesData = [
  {
    id: 1,
    title: "Computers and Laptops",
    subTitle: ""
  },
  {
    id: 2,
    title: "cosmetics and body care",
    subTitle: ""
  },
  {
    id: 3,
    title: "Accesories",
    subTitle: ""
  },
  {
    id: 4,
    title: "Cloths",
    subTitle: ""
  },
  {
    id: 5,
    title: "Shoes",
    subTitle: ""
  },
  {
    id: 6,
    title: "Gifts",
    subTitle: ""
  },
  {
    id: 7,
    title: "Pet Care",
    subTitle: ""
  },
  {
    id: 8,
    title: "Mobile and Tablets",
    subTitle: ""
  },
  {
    id: 9,
    title: "Music and Gaming",
    subTitle: ""
  },
  {
    id: 10,
    title: "Others",
    subTitle: ""
  },
];


export const SidebarData = [
  {
    icon: 'dashboard',
    heading: "Dashboard",
    navigateTo: '/dashboard'
  },
  {
    icon: 'inventory',
    heading: 'Products',
    navigateTo: '/products'
  },
  {
    icon: 'inventory_2',
    heading: "Orders",
    navigateTo: '/orders'
  },
 
  {
    icon: 'event_available',
    heading: 'Events',
    navigateTo: '/events'
  },
  {
    icon: 'new_window',
    heading: 'Create Product',
    navigateTo: '/create-product'
  },
  {
    icon: 'edit_calendar',
    heading: 'Create Event',
    navigateTo: '/create-event'
  },
  // {
  //   icon: 'mail',
  //   heading: 'Inbox',
  //   navigateTo: '/messages'
  // },
  {
    icon: 'redeem',
    heading: 'Coupons',
    navigateTo: '/coupons'
  },
  {
    icon: 'account_balance_wallet',
    heading: 'Refunds',
    navigateTo: '/refunds'
  },
];

// Analytics Cards Data
export const cardsDataStub = [
  {
    title: "Dummy 1",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970"
  },
  {
    title: "Dummmy 2",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270"
  },
  {
    title: "dummy",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
  },
];

// // Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];

export const tableDataStub = [
  {
    name: "You",
    trackingId: 18908424,
    date: "2 March 2022",
    status: "Approved",
  },
  {
    name: "Dont have",
    trackingId: 18908424,
    date: "2 March 2022",
    status: "Pending",
  },
  {
    name: "Anything",
    trackingId: 18908424,
    date: "2 March 2022",
    status: "Approved",
  },
  {
    name: "Here",
    trackingId: 18908421,
    date: "2 March 2022",
    status: "Delivered",
  },
];


