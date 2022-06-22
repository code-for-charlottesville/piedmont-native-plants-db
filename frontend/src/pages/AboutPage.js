import React from "react";

export default function AboutPage() {
  return (
    <div>
      <section>
        <h1 className="text-2xl font-medium py-1">About</h1>
        Based on available science, the plants recommended here were found in
        this region prior to the arrival of the colonists at Jamestown, thus
        making them native plants. Native plants are historic to the region,
        help give us a sense of place, and are an important part of our local
        ecosystem. A panel of local experts chose these plants based on their
        current or potential availability, their overall aesthetic interest, and
        their likelihood to grow well without major care. This database allows
        everyone from the development community to the backyard enthusiast to
        search for native plants by uses and growing conditions.
      </section>
      <section className="bg-yellow-100 rounded p-2 mt-7">
        <h1 className="text-2xl font-medium">Disclaimer</h1>
        The information contained within this database was compiled from a
        variety of sources by County staff working with local plant experts and
        is subject to unannounced additions and updates.{" "}
        <a
          className="underline text-blue-700"
          href="mailto:nativeplants@albemarle.org"
        >
          Please email us
        </a>{" "}
        with any comments or suggestions regarding the data or problems with the
        functionality of this site.
      </section>
    </div>
  );
}
