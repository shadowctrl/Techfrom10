import { NextPage } from "next";
import "./renderBlog.scss";
import Link from "next/link";
import { removeAsterisks } from "@/helper/slugFormat";
import dateFormat from "@/helper/dateFormat";

interface Props {
  title: string;
  headline: string[];
  summary: string[];
  source: string[];
  time: string[];
}

const RenderBlog: NextPage<Props> = ({
  title,
  headline,
  summary,
  source,
  time,
}) => {
  return (
    <div className="renderBlog-parent">
      <h1>{removeAsterisks(title)}</h1>
      <div className="render-wrap">
        {headline.map((title, index) => (
          <div key={index + 3} className="render-container">
            <h2>
              <li>
                {index + 1}. {removeAsterisks(title)}
              </li>
            </h2>
            <div>
              <h3>{summary[index]}</h3>

              <p>
                {" "}
                <Link
                  href={source[index]}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                >
                  Read More
                </Link>{" "}
                <span>{dateFormat(time[index])}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderBlog;
