export const SET = "SET";

// action set to set admin acccess true all over application

export const Set = () => {
  var data: any;
  if (localStorage.getItem("token")) {
    data = localStorage.getItem("token");
    data = JSON.parse(data);
    console.log(data["admin"] + "kjgkj");
    return {
      type: "SET",
      admin: data["admin"],
    };
  }
  return {
    type: "SET",
    admin: false,
  };
};
