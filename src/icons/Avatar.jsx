import { useEffect, useState } from "preact/hooks";

export default function Avatar(props) {
  const [diffEye, setDiffEye] = useState({
    left: { dx: 0, dy: 0 },
    right: { dx: 0, dy: 0 },
  });

  const calcDiff = (cx, cy, ex, ey, radius = 10) => {
    const rad = Math.atan2(ey - cy, ex - cx);
    let dx = radius * Math.abs(Math.cos(rad)) * ((cx - ex) / ex);
    dx = dx > radius ? radius : dx;
    let dy = radius * Math.abs(Math.sin(rad)) * ((cy - ey) / ey);
    dy = dy > radius ? radius : dy;
    return { dx, dy };
  };

  useEffect(() => {
    const avatar = document.getElementById("avatar");
    const getPosition = () => {
      const { bottom, left, height, width } = avatar.getBoundingClientRect();
      //in expresion (0.5 +/- X) adjust X to find the center Y
      const y = bottom - (0.5 + 0.1) * height;
      const xl = left + (0.5 - 0.1) * width;
      const xr = left + (0.5 + 0.1) * width;
      return { y, xl, xr };
    };

    document.addEventListener("mousemove", ({ clientX, clientY }) => {
      let eye = getPosition();
      if (eye.y > 0) {
        const left = calcDiff(clientX, clientY, eye.xl, eye.y);
        const right = calcDiff(clientX, clientY, eye.xr, eye.y);
        setDiffEye({
          left,
          right,
        });
      }
    });
  }, []);

  return (
    <svg
      id="avatar"
      class={props.class}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 264 280"
    >
      <defs>
        <path
          id="n"
          d="M12 160c0 66.274 53.726 120 120 120s120-53.726 120-120h12V0H0v160h12Z"
        />
        <path
          id="d"
          d="M124 144.611V163h4c39.765 0 72 32.235 72 72v9H0v-9c0-39.765 32.235-72 72-72h4v-18.389c-17.237-8.189-29.628-24.924-31.695-44.73C38.48 99.058 34 94.052 34 88V74c0-5.946 4.325-10.882 10-11.834V56c0-30.928 25.072-56 56-56s56 25.072 56 56v6.166c5.675.952 10 5.888 10 11.834v14c0 6.052-4.48 11.058-10.305 11.881-2.067 19.806-14.458 36.541-31.695 44.73Z"
        />
        <path
          id="f"
          d="M108 13.07c-17.919 2.006-31.72 7.482-31.996 21.575C50.146 45.568 32 71.165 32 100.999V110h200v-9c0-29.835-18.146-55.432-44.004-66.355-.276-14.093-14.077-19.57-31.996-21.574V32c0 13.255-10.745 24-24 24s-24-10.745-24-24V13.07Z"
        />
        <path
          id="i"
          d="M105.018 94.13c-3.868 5.591-6.76 1.817-10.88-1.254-2.481-1.849-6.177-4.148-9.634-4.035-3.456-.113-7.152 2.186-9.633 4.035-4.12 3.07-7.013 6.845-10.88 1.254-2.903-4.198-1.688-11.256 1.024-15.227 3.859-5.652 9.094-2.918 14.947-3.563 1.592-.175 3.19-.617 4.542-1.34 1.352.723 2.95 1.165 4.542 1.34 5.854.645 11.089-2.089 14.948 3.563 2.712 3.97 3.926 11.03 1.024 15.227M140.39 26c-3.424 14.075-4.998 28.434-7.481 42.671a319.166 319.166 0 0 1-1.685 8.879c-.127.62-.251 2.923-.862 3.214-1.851.884-5.624-3.817-6.633-4.879-2.533-2.666-5.045-5.356-8.13-7.448-6.235-4.227-13.535-6.726-21.13-7.32-3.178-.248-7.475.186-10.47 1.993-2.995-1.807-7.292-2.24-10.47-1.992-7.596.593-14.895 3.092-21.13 7.32-3.085 2.091-5.597 4.781-8.13 7.447-1.01 1.062-4.782 5.763-6.633 4.88-.61-.292-.735-2.595-.862-3.215a319.166 319.166 0 0 1-1.685-8.879C32.607 54.434 31.034 40.075 27.61 26c-.997 0-1.871 18.748-1.983 20.495-.452 7.094-.98 14.03-.305 21.131 1.164 12.249 2.377 27.608 11.71 36.962 8.434 8.451 20.678 10.218 31.24 15.553 1.36.687 3.163 1.535 5.108 2.23 2.049 1.563 6.113 2.629 10.794 2.629 4.91 0 9.142-1.173 11.08-2.862a47.143 47.143 0 0 0 4.475-1.997c10.56-5.336 22.805-7.102 31.238-15.553 9.334-9.354 10.547-24.713 11.712-36.962.674-7.1.146-14.037-.306-21.131C142.26 44.748 141.387 26 140.39 26Z"
        />
        <path
          id="k"
          d="M183.68 38.949c5.406-4.95 6.707-14.987 3.638-21.5-3.769-7.995-11.417-8.997-18.746-5.48-6.908 3.315-13.057 4.419-20.622 2.813-7.258-1.541-14.144-4.26-21.647-4.706-12.325-.733-24.3 3.839-32.7 13.053-1.603 1.758-2.894 3.768-4.115 5.805-.976 1.63-2.077 3.38-2.493 5.258-.198.894.17 3.098-.275 3.83-.48.79-2.296 1.515-3.069 2.102-1.567 1.189-2.924 2.53-4.18 4.047-2.666 3.222-4.133 6.587-5.368 10.572-4.102 13.245-4.45 28.998.854 42.004.707 1.734 2.898 5.352 4.186 1.638.255-.734-.334-3.194-.333-3.935.005-2.72 1.506-20.729 8.047-30.817 2.13-3.284 11.973-15.58 13.984-15.68 1.065 1.693 11.88 12.51 39.942 11.242 12.662-.572 22.4-6.26 24.738-8.727 1.028 5.533 12.992 13.816 14.815 17.224 5.267 9.846 6.435 30.304 8.445 30.265s3.453-5.237 3.867-6.23c3.072-7.375 3.595-16.632 3.267-24.559-.427-10.202-4.638-21.226-12.235-28.22Z"
        />
        <circle id="a" r={120} />
        <rect id="m" width={264} height={280} rx={0} ry={0} />
      </defs>
      <g transform="translate(12 40)">
        <use
          xlinkHref="#a"
          width={240}
          height={240}
          fill="#e6e6e6"
          fillRule="evenodd"
          transform="translate(120 120)"
        />
        <g mask="url(#b)">
          <rect
            width={240}
            height={240}
            fill="currentColor"
            fillRule="evenodd"
            rx={0}
            ry={0}
          />
          <mask
            id="b"
            width="400%"
            height="400%"
            x="-150%"
            y="-150%"
            mask-type="luminance"
          >
            <use
              xlinkHref="#a"
              width={240}
              height={240}
              fill="#fff"
              fillRule="evenodd"
              transform="translate(120 120)"
            />
          </mask>
        </g>
      </g>
      <g mask="url(#c)">
        <g transform="translate(32 36)">
          <use
            xlinkHref="#d"
            width={200}
            height={244}
            fill="#d0c6ac"
            fillRule="evenodd"
          />
          <g mask="url(#e)">
            <rect
              width={264}
              height={280}
              fill="#d08b5b"
              fillRule="evenodd"
              rx={0}
              ry={0}
            />
            <path
              fillOpacity={0.1}
              fillRule="evenodd"
              d="M156 79v23c0 30.928-25.072 56-56 56s-56-25.072-56-56V79v15c0 30.928 25.072 56 56 56s56-25.072 56-56V79Z"
            />
            <mask
              id="e"
              width="400%"
              height="400%"
              x="-150%"
              y="-150%"
              mask-type="luminance"
            >
              <use
                xlinkHref="#d"
                width={200}
                height={244}
                fill="#fff"
                fillRule="evenodd"
              />
            </mask>
          </g>
        </g>
        <g transform="translate(0 170)">
          <use
            xlinkHref="#f"
            width={200}
            height={96.929}
            fill="#b7c1db"
            fillRule="evenodd"
          />
          <g mask="url(#g)">
            <rect
              width={264}
              height={110}
              fill="#3c4f5c"
              fillRule="evenodd"
              rx={0}
              ry={0}
            />
            <path
              fill="#f4f4f4"
              fillRule="evenodd"
              d="M102 61.74V110h-7V58.15a64.54 64.54 0 0 0 7 3.59Zm67-3.59V98.5a3.5 3.5 0 1 1-7 0V61.74a64.54 64.54 0 0 0 7-3.59Z"
            />
            <path
              fillOpacity={0.16}
              fillRule="evenodd"
              d="M90.96 12.724C75.91 15.571 65.5 21.243 65.5 32.308 65.5 52.02 98.538 68 132 68s66.5-15.98 66.5-35.692c0-11.065-10.41-16.737-25.46-19.584 9.085 3.35 14.96 8.982 14.96 18.353C188 51.469 160.179 68 132 68S76 51.469 76 31.077c0-9.37 5.875-15.003 14.96-18.353Z"
            />
            <mask
              id="g"
              width="400%"
              height="400%"
              x="-150%"
              y="-150%"
              mask-type="luminance"
            >
              <use
                xlinkHref="#f"
                width={200}
                height={96.929}
                fill="#fff"
                fillRule="evenodd"
              />
            </mask>
          </g>
        </g>
        <path
          fillOpacity={0.6}
          d="M118 150c0 5.372 6.158 9 14 9s14-3.628 14-9c0-1.105-.95-2-2-2-1.293 0-1.87.905-2 2-1.242 2.938-4.317 4.716-10 5-5.683-.284-8.758-2.062-10-5-.13-1.095-.707-2-2-2-1.05 0-2 .895-2 2Z"
        />
        <path
          fillOpacity={0.16}
          fillRule="evenodd"
          d="M120 130c0 4.418 5.373 8 12 8s12-3.582 12-8"
        />
        <g fillOpacity={0.6} fillRule="evenodd" transform="translate(76 90)">
          <circle
            r={6}
            transform={`translate(${30 + diffEye.left.dx} ${
              24 + diffEye.left.dy
            })`}
          />
          <circle
            r={6}
            transform={`translate(${82 + diffEye.right.dx} ${
              24 + diffEye.right.dy
            })`}
          />
        </g>
        <path
          fillOpacity={0.6}
          fillRule="evenodd"
          transform={`translate(0 ${
            diffEye.left.dy < 0 ? diffEye.left.dy : 0
          })`}
          d="M102.547 88.148c-5.807.269-15.195 4.488-14.953 10.344.008.192.29.276.427.129 2.755-2.96 22.316-5.95 29.205-4.365.63.145 1.11-.477.71-.927-3.422-3.848-10.186-5.426-15.389-5.18m59.906-.001c5.807.269 15.195 4.488 14.953 10.344-.008.192-.29.276-.427.129-2.755-2.96-22.315-5.95-29.205-4.365-.63.145-1.11-.477-.71-.927 3.422-3.848 10.186-5.426 15.389-5.18"
        />
        <g mask="url(#h)">
          <g transform="translate(-1)">
            <g transform="translate(49 72)">
              <use
                xlinkHref="#i"
                width={118}
                height={99}
                fill="#252e32"
                fillRule="evenodd"
              />
              <g mask="url(#j)">
                <rect
                  width={264}
                  height={244}
                  fill="#2c1b18"
                  fillRule="evenodd"
                  rx={0}
                  ry={0}
                  transform="translate(-32)"
                />
                <mask
                  id="j"
                  width="400%"
                  height="400%"
                  x="-150%"
                  y="-150%"
                  mask-type="luminance"
                >
                  <use
                    xlinkHref="#i"
                    width={118}
                    height={99}
                    fill="#fff"
                    fillRule="evenodd"
                  />
                </mask>
              </g>
            </g>
            <use
              xlinkHref="#k"
              width={125}
              height={90}
              fill="#28354b"
              fillRule="evenodd"
            />
            <g mask="url(#l)">
              <rect
                width={264}
                height={280}
                fill="#2c1b18"
                fillRule="evenodd"
                rx={0}
                ry={0}
              />
              <mask
                id="l"
                width="400%"
                height="400%"
                x="-150%"
                y="-150%"
                mask-type="luminance"
              >
                <use
                  xlinkHref="#k"
                  width={125}
                  height={90}
                  fill="#fff"
                  fillRule="evenodd"
                />
              </mask>
            </g>
            <g fill="#252c2f">
              <path d="M102 133h-2.758C85.315 133 77 125.336 77 112.5c0-10.373 1.817-20.5 23.53-20.5h2.94c21.713 0 23.53 10.127 23.53 20.5 0 12.069-10.279 20.5-25 20.5Zm-1.615-35C81 98 81 104.841 81 113.502 81 120.572 84.116 129 98.97 129H102c12.365 0 21-6.373 21-15.498C123 104.84 123 98 103.615 98h-3.23ZM164 133h-2.758C147.315 133 139 125.336 139 112.5c0-10.373 1.817-20.5 23.53-20.5h2.94c21.713 0 23.53 10.127 23.53 20.5 0 12.069-10.279 20.5-25 20.5Zm-1.615-35C143 98 143 104.841 143 113.502c0 7.07 3.12 15.498 17.97 15.498H164c12.365 0 21-6.373 21-15.498C185 104.84 185 98 165.615 98h-3.23Z" />
              <path d="M70.955 97.772C71.645 97.096 79.21 92 100.5 92c17.851 0 21.63 1.853 27.35 4.652l.419.207c.398.14 2.431.83 4.81.907a16.998 16.998 0 0 0 4.563-.869C144.17 93.722 150.562 92 165.5 92c21.29 0 28.854 5.096 29.545 5.772 1.634 0 2.955 1.29 2.955 2.885v2.886c0 1.596-1.32 2.886-2.955 2.886 0 0-6.901 0-6.901 2.886s-1.962-4.176-1.962-5.772v-2.81c-3.603-1.38-10.054-3.947-20.682-3.947-11.842 0-17.739 2.1-22.798 4.185l.057.137-.003 1.986-2.217 5.35-2.739-1.083c-.244-.097-.772-.27-1.504-.451-2.04-.503-4.137-.656-5.992-.276-.68.14-1.312.35-1.891.633l-2.643 1.29-2.643-5.16.117-2.295.08-.195c-4.362-2.033-8.385-4.12-22.824-4.12-10.628 0-17.078 2.565-20.682 3.944v2.812c0 1.596-2.954 8.657-2.954 5.772s-5.91-2.886-5.91-2.886c-1.63 0-2.954-1.29-2.954-2.886v-2.886c0-1.595 1.324-2.885 2.955-2.885Z" />
            </g>
          </g>
          <mask
            id="h"
            width="400%"
            height="400%"
            x="-150%"
            y="-150%"
            mask-type="luminance"
          >
            <use
              xlinkHref="#m"
              width={264}
              height={280}
              fill="#fff"
              fillRule="evenodd"
            />
          </mask>
        </g>
        <mask
          id="c"
          width="400%"
          height="400%"
          x="-150%"
          y="-150%"
          mask-type="luminance"
        >
          <use
            xlinkHref="#n"
            width={264}
            height={280}
            fill="#fff"
            fillRule="evenodd"
          />
        </mask>
      </g>
    </svg>
  );
}
