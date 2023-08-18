import React, { useState } from "react";
import Drawer from "../components/Drawer";

interface Props {
  init: boolean;
}

const useDrawer = (props: Props) => {
  const [open, setOpen] = useState(props.init);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return { Drawer, isOpen: open, toggleDrawer, setOpen };
};

export default useDrawer;
