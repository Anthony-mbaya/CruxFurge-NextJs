import React from "react";
import Form from "next/form";
import SearchReset from "@/components/searchReset";
import { Search } from 'lucide-react';

const SearchInput = ({ search }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="mx-auto flex justify-center items-center gap-2"
    >
      <input
        name="query"
        defaultValue={search}
        className="search-input w-3/5 text-center outline-none focus:outline-blue-500 text-sm"
        placeholder="Search events..."
      />
      <div className="flex justify-center items-center gap-1">
        {search && <SearchReset />}
        <button type="submit"><Search size={16} color="blue" /></button>
      </div>
    </Form>
  );
};

export default SearchInput;
