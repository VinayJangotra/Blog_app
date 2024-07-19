import React from "react";
import PropTypes from "prop-types";

const SubscriptionTableItem = ({ email,  date }) => {
  const emailDate = date ? new Date(date) : null;

  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email ? email : "Unknown"}
      </th>
      <td className="hidden sm:block px-6 py-4">
        {emailDate ? emailDate.toDateString() : "Invalid Date"}
      </td>
      {/* <td
        onClick={() => deleteEmail(mongoId)}
        className="px-6 py-4 hover:bg-gray-200 cursor-pointer"
      >
        {"x"}
      </td> */}
    </tr>
  );
};

SubscriptionTableItem.propTypes = {
  email: PropTypes.string,
  mongoId: PropTypes.string.isRequired,
  date: PropTypes.string,
  deleteEmail: PropTypes.func.isRequired,
};

export default SubscriptionTableItem;
