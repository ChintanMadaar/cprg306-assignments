"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Item from "./item.js";

const ItemList = ({ items, onItemSelect }) => {
  const [sortBy, setSortBy] = useState("name");

  // Function to handle sorting of items
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  // Function to group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Sort items within each category
  for (const category in groupedItems) {
    groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div>
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 font-semibold rounded-lg focus:outline-none transition duration-200 ${
            sortBy === "name"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 font-semibold rounded-lg focus:outline-none transition duration-200 ${
            sortBy === "category"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setSortBy("group")}
          className={`px-4 py-2 font-semibold rounded-lg focus:outline-none transition duration-200 ${
            sortBy === "group"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Group by Category
        </button>
      </div>
      {sortBy === "group" ? (
        <div>
          {Object.keys(groupedItems)
            .sort()
            .map((category) => (
              <div key={category} className="mb-4 ml-5">
                <h2 className="text-lg font-bold capitalize">{category}</h2>
                <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                  {groupedItems[category].map((item) => (
                    <li
                      key={item.id}
                      className="bg-gray-100 border border-gray-300 rounded-lg p-4 hover:border-green-400 hover:bg-green-400"
                      onClick={() => onItemSelect(item)}
                    >
                      <Item
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                        onSelect={onItemSelect}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ) : (
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedItems.map((item) => (
            <li
              key={item.id}
              className="bg-gray-100 border border-gray-300 rounded-lg p-4 hover:border-green-400 hover:bg-green-400"
              onClick={() => onItemSelect(item)}
            >
              <Item
                name={item.name}
                quantity={item.quantity}
                category={item.category}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export default ItemList;
