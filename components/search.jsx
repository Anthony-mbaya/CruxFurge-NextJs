import React from "react";
import Form from "next/form";
import SearchReset from "@/components/searchReset";

const SearchInput = ({ search }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="mx-auto w-3/5 outline flex gap-2"
    >
      <input
        name="query"
        defaultValue={search}
        className="search-input border border-red-500"
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
