import React from "react";
import Form from "next/form";
import SearchReset from "@/components/searchReset";

const SearchInput = ({ search }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="w-4/5 outline outline-black text-black bg-gray-800 flex gap-2"
    >
      <input
        name="query"
        defaultValue={search}
        className="search-input"
        placeholder="Search events..."
      />
      <div className="border border-red-500">
        {search && <SearchReset />}
        <button type="submit">S</button>
      </div>
    </Form>
  );
};

export default SearchInput;
