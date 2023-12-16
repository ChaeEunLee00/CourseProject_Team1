import React from "react";
import styled from "@emotion/styled";

interface Post {
  id: string;
  user_id: string;
  content: string;
  city: string;
  duration: number;
  likenum: number;
  creationDate: string;
  destinations: string[];
  hashtags: string[];
  pictures: [];
  comments: [];
}

const Places = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Place = styled.div`
  margin: 5px;
  text-align: center;
`;

interface PostDetailRouteProps {
    post: Post | null;
}
const Container = styled.div``;

export const PostDetailRoute:React.FC<PostDetailRouteProps> = ({post}) => {
    return (
        <Places>
          {[...Array(10)].map((_, index) => (
            <Place key={index}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {post?.pictures && post.pictures.length > index && (
                  <img
                    src={post.pictures[index]}
                    alt={`Place ${index + 1}`}
                    width="120"
                    height="120"
                    style={{ borderRadius: "50%" }}
                  />
                )}
                {index < (post?.destinations?.length || 0) - 1 && (
                  <span style={{ marginLeft: "5px" }}>&rarr;</span>
                )}
              </div>
              <div>{post?.destinations[index]}</div>
            </Place>
          ))}
        </Places>
    )
}