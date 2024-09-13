import { useState } from 'react';
import herImg from './assets/image/herobg.png';
import TopNav from './TopNav';
const imageFormats = [
  { id: 1, text: 'JPG' },
  { id: 2, text: 'PNG' },
  { id: 3, text: 'JPEG' },
  { id: 6, text: 'WebP' },
];
import loader from './assets/image/loader.gif';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaArrowsSpin } from 'react-icons/fa6';
import { FaCloudDownloadAlt } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [image, setImage] = useState('');
  const [imagesrc, setImagesrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [convertto, setConvertto] = useState('PNG');
  const [imageisconverted, setImageisconverted] = useState(false);
  const [convertedurl, setConvertedurl] = useState('');

  const Handlefile = (e) => {
    setImageisconverted(false);
    setIsLoading(true);
    setImage(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImagesrc(reader.result);
      setIsLoading(false);
    };
  };
  const validateImage = () => {
    if (image === null || image === undefined || image === '') {
      toast.error('Select a valid image');
      throw new Error();
    }
  };
  const validateFormats = () => {
    if (
      imageFormats.some((format) => {
        return format.text == convertto;
      })
    ) {
    } else {
      toast.error('Invalid conversion format');
      throw new Error();
    }
  };

  const Convert = () => {
    validateImage();
    validateFormats();
    setIsLoading(true);
    const mime = `image/${convertto}`.toLowerCase();
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = imagesrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const anonyurl = canvas.toDataURL(mime);
      setConvertedurl(anonyurl);
      console.log(anonyurl);
      console.log(mime);
      setIsLoading(false);
      setImageisconverted(true);
    };
  };
  return (
    <>
      <ToastContainer />
      {isLoading && (
        <div className="backdrop-blur-md loader w-full h-screen fixed flex justify-center items-center ">
          <img src={loader} alt="loader" className="w-20" />
        </div>
      )}
      <TopNav />
      <section className="bg-white w-full sm:mt-10 sm:flex-row flex gap-5 justify-center items-center p-2 flex-col  pt-20">
        <div className="sm:w-5/12 w-10/12 h-5/6">
          <div className="w-full flex flex-col sm:flex-row sm:justify-end justify-center items-center ">
            <img src={herImg} alt="" className="sm:w-10/12 w-7/12" />
            <div className="text-center">
              <h2 className="mb-2 capitalize sm:text-6xl text-4xl font-extrabold text-balance">
                Convert Images seemingly
              </h2>
              <p>100% Automatically and Free</p>
            </div>
          </div>
        </div>

        <div className="sm:w-4/12 w-11/12 shadow-2xl h-max  p-6 rounded-3xl">
          <div className="mb-4   justify-between items-center">
            <p className="text-center mb-4 font-medium">
              SELEECT CONVERSION FORMAT
            </p>
            <select
              value={convertto}
              onChange={(e) => {
                setImageisconverted(false);

                setConvertto(e.target.value);
              }}
              className="bg-transparent w-full text-center outline-0 rounded-lg shadow-inner shadow-emerald-300 px-2 py-3"
            >
              {imageFormats.map(({ id, text }) => {
                return <option key={id}>{text}</option>;
              })}
            </select>
          </div>
          <div className="w-full text-2xl shadow  shadow-emerald-200 rounded-lg min-h-48 flex flex-col justify-center items-center p-4">
            <input type="file" hidden id="image" onChange={Handlefile} />

            <label
              htmlFor="image"
              className="mb-4 hover:cursor-pointer flex items-center gap-1 bg-emerald-400 px-6 py-5 rounded-2xl text-white font-bold"
            >
              <FaCloudUploadAlt />
              UPLOAD IMAGE
            </label>
            {imagesrc ? (
              <div className="text-center">
                <img
                  src={imagesrc}
                  alt=""
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <small className="font-mono tracking-[10px] text-sm">
                  Image preview
                </small>

                {!imageisconverted ? (
                  <button
                    onClick={Convert}
                    className="mx-auto mt-4 flex items-center gap-1 bg-blue-600 px-4 py-3 rounded-2xl text-white font-bold text-sm hover:opacity-80"
                  >
                    <FaArrowsSpin />
                    CONVERT
                  </button>
                ) : (
                  <a
                    href={convertedurl}
                    download={true}
                    className="mx-auto mt-4 flex items-center gap-1 bg-blue-600 px-4 py-3 rounded-2xl text-white font-bold text-sm hover:opacity-80"
                  >
                    <FaCloudDownloadAlt />
                    DOWNLOAD CONVERTED IMAGE
                  </a>
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default App;
