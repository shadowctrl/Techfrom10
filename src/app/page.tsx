"use client";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface Props {}

interface dataprop {
  _id: string;
  title: string;
  headlines: string[];
  summary: string[];
  source: string[];
  published: string[];
  hashtags: string[];
  imgUrl: string;
}

const Page: NextPage<Props> = ({}) => {
  const [data, setData] = useState<dataprop[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<dataprop[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchRoundup`,
        { cache: "no-cache" }
      );
      const data: dataprop[] = await res.json();
      setData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  const handleTagSelection = (hashtag: string) => {
    if (hashtag === "uncategorized") {
      setSelectedTags(["uncategorized"]);
    } else {
      setSelectedTags((prevTags) =>
        prevTags.includes(hashtag)
          ? prevTags.filter((tag) => tag !== hashtag)
          : [...prevTags.filter((tag) => tag !== "uncategorized"), hashtag]
      );
    }
  };

  useEffect(() => {
    if (selectedTags.includes("uncategorized") || selectedTags.length === 0) {
      setSelectedTags(["uncategorized"]);
      setFilteredData(data);
    } else {
      const newFilteredData = data
        .map((item) => ({
          ...item,
          headlines: item.headlines.filter((_, idx) =>
            selectedTags.includes(item.hashtags[idx])
          ),
        }))
        .filter((item) => item.headlines.length > 0);

      setFilteredData(newFilteredData);
    }
  }, [selectedTags, data]);

  return (
    <div className="hero-parent">
      <div className="hero-container-wrap">
        {filteredData.map((val) => (
          <div key={val._id} className="hero-container">
            <div className="hero-container-head">
              <Link href={"/view/" + val._id.toString()}>
                <h2>{val.title}</h2>
              </Link>
            </div>
            <div className="hero-content-wrap">
              {" "}
              <Image
                src={val.imgUrl ? `${val.imgUrl}` : "/test.jpg"}
                width={250}
                height={1024}
                alt={val.title}
              />
              <ul>
                {val.headlines.map((h, hindex) => (
                  <li key={hindex}>{h}</li>
                ))}
              </ul>
            </div>
            <Link href={"/view/" + val._id.toString()} className="view-in-full">
              View in Full
            </Link>
          </div>
        ))}
      </div>
      <div className="hero-container-fixed">
        <div className="hero-search">
          <form action="submit">
            <input type="text" placeholder="search" />
            <button>search</button>
          </form>
        </div>
        <div className="hero-card1">
          <h3>Hashtags</h3>
          <div className="hero-card1-items">
            <Badge
              key="uncategorized"
              onClick={() => handleTagSelection("uncategorized")}
              className={
                selectedTags.includes("uncategorized")
                  ? "selected-hashtag"
                  : "unselected-hashtag"
              }
            >
              #Uncategorized
            </Badge>
            {Array.from(
              new Set(
                data.flatMap((item) =>
                  item.hashtags.map((tag) => tag.toLowerCase())
                )
              )
            ).map((hashtag, index) => (
              <Badge
                key={index}
                onClick={() => handleTagSelection(hashtag)}
                className={
                  selectedTags.includes(hashtag)
                    ? "selected-hashtag"
                    : "unselected-hashtag"
                }
              >
                #{hashtag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
