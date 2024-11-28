import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <SpinnerSvgCss viewBox="0 0 50 50">
      <circle
        className={`path stroke-color-animate`}
        cx="25"
        cy="25"
        r="20"
        fill="none"
      />
    </SpinnerSvgCss>
  );
};

export default LoadingSpinner;

const SpinnerSvgCss = styled.svg`
  animation: rotate 1.2s linear infinite;
  width: 40px;
  margin: 0 auto;

  .path {
    animation: dash 1.3s ease-in-out infinite;
    stroke-linecap: round;
    stroke-width: 3px;
    stroke: #073bc5;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
