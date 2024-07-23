import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../routes/firebase";
import Tweet from "./tweets";
import { Unsubscribe } from "firebase/firestore";

export interface ITweet {
  id: string;
  photo?: string;
  username: string;
  userid: string;
  tweet: string;
  createAt: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Timeline = () => {
  const [tweet, setTweet] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweet = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createAt", "desc"),
        limit(25)
      );

      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { photo, createAt, username, userid, tweet } = doc.data();
          return { photo, createAt, username, userid, tweet, id: doc.id };
        });
        setTweet(tweets);
      });
    };
    fetchTweet();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweet.map((t) => (
        <Tweet key={t.id} {...t} />
      ))}
    </Wrapper>
  );
};

export default Timeline;
