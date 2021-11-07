export default function Dalenta({ className, style, fill, width, height }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.19202 9.46358C-0.0640067 9.20755 -0.0640068 8.79245 0.19202 8.53642L8.53642 0.19202C8.79245 -0.0640066 9.20755 -0.0640068 9.46358 0.19202L17.808 8.53642C18.064 8.79245 18.064 9.20755 17.808 9.46358L9.46358 17.808C9.20755 18.064 8.79245 18.064 8.53642 17.808L0.19202 9.46358ZM9.46358 3.15892C9.20755 2.90289 8.79245 2.90289 8.53642 3.15892L7.14569 4.54965L11.596 9L7.14569 13.4503L8.53642 14.8411C8.79245 15.0971 9.20755 15.0971 9.46358 14.8411L14.8411 9.46358C15.0971 9.20755 15.0971 8.79245 14.8411 8.53642L9.46358 3.15892Z"
        fill={fill}
      ></path>
    </svg>
  );
}

Dalenta.defaultProps = {
  width: "18",
  height: "18",
  fill: "#8F8F8F",
};
