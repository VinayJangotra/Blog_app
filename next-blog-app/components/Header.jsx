import { assets } from "@/Assets/assets";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import SuprSendInbox from "@suprsend/react-inbox";
import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await axios.post('/api/email', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Failed to subscribe");
      }
    } catch (error) {
      toast.error("An error occurred while subscribing");
    }
  };
const darkColors = {
  primary: "#2E70E8",
  primaryText: "#EFEFEF",
  secondaryText: "#CBD5E1",
  border: "#3A4A61",
  main: "#1D2635",
  error: "#F97066",
};

const sampleDarkTheme = {
  bell: { color: "#fff" },
  badge: { backgroundColor: darkColors.primary },
  header: {
    container: {
      backgroundColor: darkColors.main,
      borderBottom: `0.5px solid ${darkColors.border}`,
      boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5)",
    },
    headerText: { color: darkColors.primaryText },
    markAllReadText: { color: darkColors.primary },
  },
  tabs: {
    color: darkColors.primaryText,
    unselectedColor: darkColors.secondaryText + "D9",
    bottomColor: darkColors.primary,
    badgeColor: "rgba(100, 116, 139, 0.5)",
    badgeText: darkColors.primaryText,
  },
  notificationsContainer: {
    container: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border,
    },
    noNotificationsText: {
      color: darkColors.primaryText,
    },
    noNotificationsSubtext: {
      color: darkColors.secondaryText,
    },
    loader: { color: darkColors.primary },
  },
  notification: {
    container: {
      borderBottom: `1px solid ${darkColors.border}`,
      readBackgroundColor: darkColors.main,
      unreadBackgroundColor: "#273244",
      hoverBackgroundColor: "#2D3A4D",
    },
    pinnedText: {
      color: darkColors?.secondaryText,
    },
    pinnedIcon: {
      color: "red",
    },
    headerText: { color: darkColors.primaryText },
    bodyText: {
      color: darkColors.secondaryText,
      blockquoteColor: "rgba(100, 116, 139, 0.5)",
    },
    unseenDot: { backgroundColor: darkColors.primary },
    createdOnText: { color: darkColors.secondaryText },
    subtext: { color: "#94a3b8" },
    actions: [
      { container: { backgroundColor: darkColors.primary } },
      {
        container: {
          borderColor: darkColors.border,
          backgroundColor: "transparent",
          hoverBackgroundColor: darkColors.main,
        },
        text: { color: darkColors.secondaryText },
      },
    ],
    expiresText: {
      backgroundColor: "rgba(100, 116, 139, 0.5)",
      color: darkColors.secondaryText,
      expiringBackgroundColor: "rgba(217, 45, 32, 0.15)",
      expiringColor: darkColors.error,
    },
    actionsMenuIcon: {
      color: darkColors.secondaryText,
      hoverBackgroundColor: "rgba(100, 116, 139, 0.5)",
    },
    actionsMenu: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border,
    },
    actionsMenuItem: { hoverBackgroundColor: "rgba(100, 116, 139, 0.2)" },
    actionsMenuItemIcon: { color: darkColors.secondaryText },
    actionsMenuItemText: {
      color: darkColors.secondaryText,
    },
  },
  toast: {
    container: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border,
    },
    headerText: { color: darkColors.primaryText },
    bodyText: {
      color: darkColors.secondaryText,
      blockquoteColor: darkColors.border,
    },
  },
};
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <Image
          src={assets.logo}
          width={180}
          alt="Logo"
          className="w-[130px] sm:w-auto"
        />
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] transition-transform transform hover:scale-105">
              Get started
              <Image src={assets.arrow} alt="Arrow" />
            </button>
          </Link>
          <SuprSendInbox
            themeType="light / dark"
            badgeComponent={(count) => <p>{count}</p>}
            tabBadgeComponent={({ count }) => <p>{count}</p>}
            theme={{
              notification: {
                container: { readBackgroundColor: "gray" },
                headerText: { color: "red" },
                bodyText: { color: "blue" },
                unseenDot: { backgroundColor: "red" },
              },
            }}
            workspaceKey="<workspace_key>"
            subscriberId="<subscriber_id>"
            distinctId="<distinct_id>"
            className="hidden sm:block"
          />
        </div>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
          deleniti impedit ea numquam nam et voluptates facilis illum beatae,
          fugiat ipsa, architecto nemo! Excepturi quam qui repudiandae velit
          sunt maxime!
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
