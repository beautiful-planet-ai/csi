import reportCard from "assets/Citizen/CSI Score.png";
import kyc from "assets/Citizen/know your city image- CSI for Citizen revised 1.png";
import Footer from "components/landingPage/Footer";
import Header from "../Layout/Header";
import Laptop from "../assets/laptop.png";
import Chatbot from "../components/Citizen/Chatbot";

const Citizen = () => {
  // const videoRef = useRef(null); // Create a ref for the video element

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.playbackRate = 0.3; // Reduce playback speed
  //   }
  // }, []); // Run this effect once when the component mounts

  return (
    <div className="flex flex-column w-full ">
      {/* Header */}
      <Header />

      <div className="flex flex-column gap-1 align-items-center justify-content-center h-auto w-screen">
        <div className="w-full h-screen">
          <video
            // ref={videoRef} // Attach ref to the video element
            autoPlay
            muted
            loop
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source
              src="https://res.cloudinary.com/dqbjijwmy/video/upload/v1737614485/CSI-videos/kiugqiiqzerbnfmhcjvp.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div
          className="border-round-xl p-2"
          style={{
            // backgroundColor: "rgba(247, 164, 122, 0.7)",
            background:
              "linear-gradient(to left, #5b98a4, rgba(15, 75, 87, 0.8))",
            width: "70rem",
            position: "absolute",
            top: "80%",
            left: "15%",
            // transform: "translate(-50%, 175%)",
          }}
        >
          <h1 className="text-4xl text-white text-center font-medium">
            Explore Your City’s Sustainability Performance With Beautiful
            Planet.AI' CSI
          </h1>
          {/* <div className="flex align-items-center justify-content-center w-full flex-row">
            <p className="text-lg text-white mr-2">
              {" "}
              Already a registered citizen?
            </p>
            <Button
              label="Sign in"
              className="bg-theme"
              onClick={() => setVisible(true)}
            />
          </div> */}
        </div>

        {/* Chatbot component */}
        <Chatbot />
      </div>

      <div className="flex flex-column px-4 align-items-center justify-content-center ">
        {/*First Card*/}
        <div className="flex w-full m-4 block">
          {/* Image Column */}
          <div style={{ flex: "60%", position: "relative" }}>
            <img
              src={kyc}
              alt="Main"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px 0 0 10px",
              }}
            />
            <img
              src={Laptop}
              alt="Small"
              style={{
                width: "42rem",
                height: "19rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -52%)",
              }}
            />
            {/* <img
              src={kyc_ss}
              alt="Small"
              style={{
                width: "30rem",
                height: "19rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
              }}
            /> */}
            <video
              src="https://res.cloudinary.com/dqbjijwmy/video/upload/v1737609036/CSI-videos/b06uxnzmupmvdtoct767.mp4"
              autoPlay
              muted
              loop
              className="h-16rem border-round-top-xl "
              style={{
                objectFit: "cover",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
              }}
            />
          </div>
          {/* Text Column */}
          <div
            className="flex align-items-center justify-content-center p-8"
            style={{
              flex: "40%",
              background: "linear-gradient(to left, #1F8297, #166C7D, #003940)",
              borderRadius: "0 10px 10px 0",
            }}
          >
            <div>
              <p className="text-white text-4xl">Know Your City</p>
              <p className="text-white text-xl">
                Get an overview of your city's demographics, including
                population, infrastructure, and services. Learn how your city
                performs in key areas like water management, waste disposal,
                housing, and more.
              </p>
            </div>
          </div>
        </div>

        {/*Second Card*/}
        <div className="w-full flex m-4 block">
          <div
            className="flex align-items-center justify-content-center p-8"
            style={{
              flex: "40%",
              background: "linear-gradient(to left, #1F8297, #166C7D, #003940)",
              borderRadius: "10px 0 0 10px",
            }}
          >
            <div>
              <p className="text-white text-4xl">CSI Score and Trends</p>
              <p className="text-white text-xl mb-1">
                View your city's sustainability performance with an
                easy-to-understand report card. This section breaks down the
                overall CSI score into three dimensions— Nature, Society, and
                Administration providing clarity on the city’s strengths and
                areas needing improvement.
              </p>
              <br />
              <p className="text-white text-xl"></p>
            </div>
          </div>

          <div style={{ flex: "60%", position: "relative" }}>
            <img
              src={reportCard}
              alt="Main"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0 10px 10px 0",
              }}
            />
            <img
              src={Laptop}
              alt="Small"
              style={{
                width: "42rem",
                height: "19rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -47%)",
              }}
            />
            {/* <img
              src={report_ss}
              alt="Small"
              style={{
                width: "30rem",
                height: "19rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
              }}
            /> */}
            <video
              src="https://res.cloudinary.com/dqbjijwmy/video/upload/v1737609033/CSI-videos/ppppzd4vhqsmxrejudvt.mp4"
              autoPlay
              muted
              loop
              className="h-16rem border-round-top-xl "
              style={{
                objectFit: "cover",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Citizen;
