import React from "react";
import { useDrag } from "react-dnd";

const DraggableCard = ({ id, title, thumbnail }) => {
  // Use the useDrag hook to make the card draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD", // Type of the draggable item
    item: { id }, // Data to be passed when dragging
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Track if the card is being dragged
    }),
  }));

  return (
    <div
      ref={drag} // Attach the drag ref to the card
      className={`bg-[#2b2b3d] p-4 rounded-lg shadow-md transition-all duration-300 ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ cursor: "move" }} // Change cursor to indicate draggable
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 sm:h-36 md:h-48 lg:h-52 object-cover rounded"
      />

      {/* Title */}
      <h3 className="text-white text-center mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
        {title}
      </h3>
    </div>
  );
};

export default DraggableCard;
