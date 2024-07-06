import {
  HomeOutlined,
  PieChartOutlined,
  PlaySquareOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

export const menu = [
  {
    icon: <HomeOutlined />,
    label: "Home",
    path: "/",
  },
  {
    icon: <PlaySquareOutlined />,
    label: "Screen Record",
    path: "/screen-record",
  },
  {
    icon: <VideoCameraOutlined />,
    label: "Self Record",
    path: "/self-record",
  },
  {
    icon: <PieChartOutlined />,
    label: "Tracking Record",
    path: "/tracking-record",
  },
];
