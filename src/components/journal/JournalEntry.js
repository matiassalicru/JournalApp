import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://www.befunky.com/images/wp/wp-2016-03-blur-background-featured-1.jpg?auto=webp&format=jpg&width=1320)",
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">
            El mar es infinito
        </p>
        <p className="journal__entry-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo culpa
          vel voluptatibus ducimus quod.
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
