import { Subject } from "subjecto";
import { auth } from "./auth";
import { ui } from "./ui";
import { useEffect, useState } from "react";

/**
 * Add a React hook to the Subject prototype
 */
Subject.prototype.hook = function useHook() {
  const [value, setValue] = useState(this.value);
  useEffect(() => this.subscribe(setValue).unsubscribe, []);
  return value;
};

export {
  ui,
  auth
}