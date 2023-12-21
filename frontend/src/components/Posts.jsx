import React from "react";

const Posts = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-center mt-10 cursor-pointer">
      <div className="w-full md:w-[60%] lg:w-[40%]">
        <img
          src="https://techcrunch.com/wp-content/uploads/2023/11/GettyImages-1778704897.jpg?w=850&h=492&crop=1"
          className="h-full"
        />
      </div>

      <div className="w-full md:w-[50%] lg:w-[60%] p-4 flex flex-col gap-3 md:ml-8">
        <h2 className="font-semibold text-2xl">
          OpenAI’s initial new board counts Larry Summers among its ranks
        </h2>
        <p className="text-sm text-gray-400">
          Kyle Wiggers@kyle_l_wiggers/12:22 PM GMT+5:30•November 22,2023
        </p>
        <p>
          Around 1 a.m. Eastern Time on Tuesday, OpenAI announced that, after
          the company’s previous board of directors abruptly fired Sam Altman as
          CEO last Friday, it had reached an agreement “in principle” for Altman
          to return to OpenAI as CEO in tow with a new “initial” slate of board
          members.
        </p>
      </div>
    </div>
  );
};

export default Posts;
