import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns/esm";
import { PropTypes } from "prop-types";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

TimeAgo.propTypes = {
  timestamp: PropTypes.string,
};
export default TimeAgo;
