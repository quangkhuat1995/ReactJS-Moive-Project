import React from "react";

import { useSelector } from "react-redux";
import { FAKE_IMG } from "../../constants/config";

import DiscussHeader from "./DiscussHeader";

import ModalReview from "../ModalPopup/ModalReview";
import BtnViewMore from "../BtnViewMore";
import { TogglePostProvider } from "../../context/TogglePostContext";
import DiscussGroup from "./DiscussGroup";
const avatar = "/images/avatar.png";

function DiscussSection() {
  const isLoggedIn = useSelector((state) => state.userLoginReducer.isLoggedIn);

  const reviews = useSelector((state) => state.reviewsReducer.posts);

  // const [posts, setPots] = useState(reviews);

  return (
    <>
      <section className="discuss myContainer">
        <div
          className="discuss__click"
          data-toggle="modal"
          data-target="#reviewInput"
        >
          <div className="discuss__item">
            <DiscussHeader
              src={isLoggedIn ? FAKE_IMG : avatar}
              hasInfo={false}
            />
          </div>
        </div>

        <div className="discuss__area clearfix">
          <TogglePostProvider initialPosts={reviews} postSize={5}>
            <DiscussGroup />

            <BtnViewMore />
            <ModalReview />
          </TogglePostProvider>
        </div>
      </section>
    </>
  );
}

export default DiscussSection;
