import React from "react";
import Form from "next/form";
import SearchReset from "@/components/searchReset";
import { Search } from 'lucide-react';

const SearchInput = ({ search }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="w-fit sm:w-4/5 rounded-full mx-auto flex justify-center items-center gap-2"
    >
      <input
        name="query"
        defaultValue={search}
        className="search-input w-5/5 sm:py-1 rounded-full text-center outline-none focus:outline-blue-500 text-sm sm:text-[0.9rem]"
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
