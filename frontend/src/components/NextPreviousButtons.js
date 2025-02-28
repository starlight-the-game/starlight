import PropTypes from "prop-types";
import React, { useEffect } from "react";
import nextArrow from "starlight-web/src/assets/nextArrow.png";
import previousArrow from "starlight-web/src/assets/previousArrow.png";

const NextPreviousButtons = ({ currentSongIndex, setCurrentSongIndex, songs, setCurrentSong }) => {
    const handleNextSong = () => {
        triggerFadeEffect(() => {
            const newIndex = (currentSongIndex + 1) % songs.length;
            setCurrentSongIndex(newIndex);
            setCurrentSong(songs[newIndex]);
        });
    };

    const handlePreviousSong = () => {
        triggerFadeEffect(() => {
            const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            setCurrentSongIndex(newIndex);
            setCurrentSong(songs[newIndex]);
        });
    };

    const triggerFadeEffect = callback => {
        const imgElement = document.querySelector(".background-image img");
        if (imgElement) {
            imgElement.classList.add("fade-out");
            imgElement.addEventListener(
                "transitionend",
                () => {
                    callback();
                    imgElement.classList.remove("fade-out");
                    imgElement.classList.add("fade-in");
                    imgElement.addEventListener(
                        "transitionend",
                        () => {
                            imgElement.classList.remove("fade-in");
                        },
                        { once: true }
                    );
                },
                { once: true }
            );
        } else {
            callback();
        }
    };

    const triggerButtonHoverEffect = selector => {
        const button = document.querySelector(selector);
        if (button) {
            button.classList.add("hover");
            setTimeout(() => {
                button.classList.remove("hover");
            }, 300);
        }
    };

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.keyCode === 39) {
                // Right arrow key
                handleNextSong();
                triggerButtonHoverEffect(".next-btn");
            } else if (event.keyCode === 37) {
                // Left arrow key
                handlePreviousSong();
                triggerButtonHoverEffect(".prev-btn");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleNextSong, handlePreviousSong]);

    return (
        <div className="song-navigation">
            <button className="nav-btn prev-btn" onClick={handlePreviousSong}>
                <img
                    src={previousArrow}
                    alt="Previous"
                    style={{ width: "21px", height: "21px", transition: "transform 0.3s" }}
                />
            </button>
            <button className="nav-btn next-btn" onClick={handleNextSong}>
                <img
                    src={nextArrow}
                    alt="Next"
                    style={{ width: "21px", height: "21px", transition: "transform 0.3s" }}
                />
            </button>
        </div>
    );
};

NextPreviousButtons.propTypes = {
    currentSongIndex: PropTypes.number.isRequired,
    setCurrentSongIndex: PropTypes.func.isRequired,
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    setCurrentSong: PropTypes.func.isRequired
};

export default NextPreviousButtons;
