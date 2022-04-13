import { Disclosure } from "@headlessui/react";
import React from "react";

export default function Collapsible({ children, title }) {
  return (
    <Disclosure>
      <Disclosure.Button className="py-2 border-b w-full text-left">
        <h1 className="text-xl px-2">{title}</h1>
      </Disclosure.Button>
      <Disclosure.Panel className="p-2">{children}</Disclosure.Panel>
    </Disclosure>
  );
}
