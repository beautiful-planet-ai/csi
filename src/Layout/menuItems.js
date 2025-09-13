import {
  Ambulance,
  BookOpenText,
  BriefcaseBusiness,
  Building,
  Bus,
  CloudHail,
  Droplet,
  EarthLock,
  FileChartPie,
  HeartHandshake,
  Landmark,
  LandPlot,
  Sprout,
  ThermometerSun,
  Trash,
  Users,
  Wind,
} from "lucide-react";
import pathConstants from "components/DashboardUtility/Constants/pathConstants";

const menuItems = [
  {
    label: "Know Your City",
    path: pathConstants.KYC,
    icon: <Building size={20} className="text-white mr-2" />,
  },
  {
    label: "City Report Card",
    path: pathConstants.CRC,
    icon: <FileChartPie size={20} className="text-white mr-2" />,
  },
  {
    label: "Nature",
    path: pathConstants.NATURE,
    icon: <Sprout size={20} className="text-white mr-2" />,
    nestedItems: [
      // {
      //   label: "Air Quality Index",
      //   path: pathConstants.AQI,
      //   icon: <Wind size={15} className="text-white mr-2" />,
      // },
      {
        label: "Air Quality Index",
        path: pathConstants.LiveAQI,
        icon: <Wind size={15} className="text-white mr-2" />,
      },
      {
        label: "Water Management",
        path: pathConstants.WATER,
        icon: <Droplet size={15} className="text-white mr-2" />,
      },
      {
        label: "Land Usage",
        path: pathConstants.LAND,
        icon: <LandPlot size={15} className="text-white mr-2" />,
      },
      {
        label: "Waste Management",
        path: pathConstants.WASTE,
        icon: <Trash size={15} className="text-white mr-2" />,
      },
      {
        label: "Temperature",
        path: pathConstants.TEMP,
        icon: <ThermometerSun size={15} className="text-white mr-2" />,
      },
      {
        label: "Rainfall",
        path: pathConstants.RAIN,
        icon: <CloudHail size={15} className="text-white mr-2" />,
      },
    ],
  },
  {
    label: "Society",
    path: pathConstants.SOCIETY,
    icon: <Users size={20} className="text-white mr-2" />,
    nestedItems: [
      {
        label: "Healthcare",
        path: pathConstants.HEALTHCARE,
        icon: <Ambulance size={15} className="text-white mr-2" />,
      },
      {
        label: "Education",
        path: pathConstants.EDUCATION,
        icon: <BookOpenText size={15} className="text-white mr-2" />,
      },
      {
        label: "Public Transport",
        path: pathConstants.TRANSPORT,
        icon: <Bus size={15} className="text-white mr-2" />,
      },
      {
        label: "Employment Opportunity",
        path: pathConstants.EMPLOYMENT,
        icon: <BriefcaseBusiness size={15} className="text-white mr-2" />,
      },
      {
        label: "Cultural Preservation",
        path: pathConstants.CULTURE,
        icon: <EarthLock size={15} className="text-white mr-2" />,
      },
      {
        label: "Community Engagement & Holistic Well-Being",
        path: pathConstants.COMMUNITY,
        icon: <HeartHandshake size={25} className="text-white mr-2" />,
      },
    ],
  },
  {
    label: "Administration",
    path: pathConstants.ADMIN,
    icon: <Landmark size={20} className="text-white mr-2" />,
    nestedItems: [
      {
        label: "Disaster Management",
        path: pathConstants.DISASTER,
        icon: <Bus size={15} className="text-white mr-2" />,
      },
    ],
  },
];

export default menuItems;
