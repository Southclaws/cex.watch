import React from "react";
import Link from "next/link";

export const Results = ({ results }) => {
  if (results.length === 0) {
    return (
      <div class="flex items-center justify-center pa4 bg-red navy">
        <svg class="w1" data-icon="info" viewBox="0 0 32 32" fill="white">
          <title>info icon</title>
          <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6" />
        </svg>
        <span class="lh-title white ml3">No results</span>
      </div>
    );
  }

  return (
    <ul className="list pl0 measure center">
      {results.map(v => {
        return (
          <li
            key={v.boxId}
            className="lh-copy pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30"
          >
            <Link href={`/product?id=${v.boxId}`} as={`/product/${v.boxId}`}>
              <a
                className={[
                  "link",
                  "pv1",
                  "red",
                  "bg-animate",
                  "hover-bg-light-red",
                  "hover-white"
                ].join(" ")}
                href={`/product/${v.boxId}`}
              >{`${v.boxName}`}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
