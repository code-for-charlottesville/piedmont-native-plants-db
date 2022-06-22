import { Disclosure } from "@headlessui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Collapsible({ children, title, className }) {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="py-1 w-full text-left">
            <div className={`${className} flex items-center`}>
              <h1 className="grow">{title}</h1>
              <FontAwesomeIcon
                className={`text-gray-600 text-xl px-2 ${
                  !open && "rotate-180"
                }`}
                icon={faAngleDown}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="p-2">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
