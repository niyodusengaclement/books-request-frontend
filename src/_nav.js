export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
    },
    {
      divider: true,
    },
    {
      title: true,
      name: "Request",
    },
    {
      name: "Churches",
      url: "/churches",
      icon: "icon-home",
      children: [
        {
          name: "Create Request",
          url: "/create-request",
          icon: "icon-star",
        },
      ],
    },

    {
      title: true,
      name: "Components",
      wrapper: {
        element: "",
        attributes: {},
      },
    },
    {
      divider: true,
    },
    {
      title: true,
      name: "Extras",
    },
    {
      name: "Pages",
      url: "/pages",
      icon: "icon-star",
      children: [
        {
          name: "Login",
          url: "/login",
          icon: "icon-star",
        },
        {
          name: "Register",
          url: "/register",
          icon: "icon-star",
        },
        {
          name: "Error 404",
          url: "/404",
          icon: "icon-star",
        },
        {
          name: "Error 500",
          url: "/500",
          icon: "icon-star",
        },
        {
          name: "Request page",
          url: "/request",
          icon: "icon-star",
        },
      ],
    },
  ],
};
