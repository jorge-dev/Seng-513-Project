import slugify from "../utils/slugify.js";
const products = [
  {
    name: "Logitech DESK MAT Studio Series",
    vendor: "Logitech",
    price: 29.99,
    description:
      "Beautiful and comfortable desk mat with anti-slip base and spill-resistant design",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356541/compfest/Accesories/deskMats/LogitechDESKMAT_tsw0vt.webp",
    mainCategory: "accessories",
    subCategory: "deskMats",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech MOUSE PAD - Studio Series",
    vendor: "Logitech",
    price: 14.99,
    description: "Soft mouse pad for comfortable and effortless gliding.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356646/compfest/Accesories/mousePads/LogitechMOUSEPAD_aolpb3.webp",
    mainCategory: "accessories",
    subCategory: "mousePads",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Sphex V2",
    vendor: "Razer",
    price: 14.99,
    description: "Ultra Thin Spectrum-Colored Mouse Mat.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648411989/compfest/Accesories/mousePads/RazerSphexV2_itszte.png",
    mainCategory: "accessories",
    subCategory: "mousePads",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Firefly V2",
    vendor: "Razer",
    price: 49.99,
    description: "Micro-textured Surface Mouse Mat with Razer Chroma.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648657977/compfest/Accesories/mousePads/RazerFireflyV2_bgnxdm.png",
    mainCategory: "accessories",
    subCategory: "mousePads",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech MX Palm Rest",
    vendor: "Logitech",
    price: 20.99,
    description: "Premium, no-slip support for hours of comfortable typing.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356664/compfest/Accesories/wristWrest/LogitechMXPalmRest_ids9ch.webp",
    mainCategory: "accessories",
    subCategory: "wristWrest",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech H151 Stereo Headset",
    vendor: "Logitech",
    price: 29.99,
    description: "Multi-device headset with in-line controls",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356728/compfest/Headphones/wired/LogitechH151StereoHeadset_gsinlg.webp",
    mainCategory: "headphones",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech H540 USB Computer Headset",
    vendor: "Logitech",
    price: 20.99,
    description: "With High-Definition sound and on-ear",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356728/compfest/Headphones/wired/LogitechH540USBComputerHeadset_vyqdbs.webp",
    mainCategory: "headphones",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech H370",
    vendor: "Logitech",
    price: 45.99,
    description: "USB Computer Headset",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356728/compfest/Headphones/wired/LogitechWiredH370_salkq2.webp",
    mainCategory: "headphones",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech Zone 900",
    vendor: "Logitech",
    price: 69.99,
    description:
      "Bluetooth headset features noise-canceling mic and exceptional sound.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356706/compfest/Headphones/wireless/LogitechZone_b3nmxk.webp",
    mainCategory: "headphones",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech H800 Bluetooth WIRELESS HEADSET",
    vendor: "Logitech",
    price: 85.99,
    description: "For computers, smartphones and tablets",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356706/compfest/Headphones/wireless/LogitechH800_vhqw2v.webp",
    mainCategory: "headphones",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech K845 Mechanical Illuminated",
    vendor: "Logitech",
    price: 79.99,
    description:
      "A corded aluminum mechanical keyboard with a choice of switches.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356757/compfest/Keyboards/mech/wired/LogitechK845MechanicalIlluminated_ekupmj.webp",
    mainCategory: "keyboards",
    subCategory: "mech_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech Pop Keys",
    vendor: "Logitech",
    price: 129.99,
    description: "Wireless Mechanical Keyboard with Customizable Emoji Keys",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648624037/compfest/Keyboards/mech/wireless/LogitechPopKeyboard_nsxrvv.png",
    mainCategory: "keyboards",
    subCategory: "mech_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech Illuminated Keyboard K740",
    vendor: "Logitech",
    price: 99.99,
    description: "Slim design and backlit",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356849/compfest/Keyboards/non-mech/wired/LogitechIlluminatedKeyboardK740_jnkkam.webp",
    mainCategory: "keyboards",
    subCategory: "membrane_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech Keyboard K120",
    vendor: "Logitech",
    price: 19.99,
    description: "Plug-and-Play USB Keyboard",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356849/compfest/Keyboards/non-mech/wired/LogitechKeyboardK120_iizqtl.png",
    mainCategory: "keyboards",
    subCategory: "membrane_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech ERGO K860",
    vendor: "Logitech",
    price: 149.99,
    description: "Split Ergonomic Keyboard.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356864/compfest/Keyboards/non-mech/wireless/LogitechERGOK860_iinqsw.png",
    mainCategory: "keyboards",
    subCategory: "membrane_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech K360 Wireless Keyboard",
    vendor: "Logitech",
    price: 139.99,
    description: "Compact and thin wireless keyboard.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356864/compfest/Keyboards/non-mech/wireless/LogitechK360_x4meyo.webp",
    mainCategory: "keyboards",
    subCategory: "membrane_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech K380 Multi-Device Bluetooth Keyboard",
    vendor: "Logitech",
    price: 39.99,
    description: "Minimalist keyboard for computers, tablets and phones.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356864/compfest/Keyboards/non-mech/wireless/LogitechK380Multi-Device_uciakt.webp",
    mainCategory: "keyboards",
    subCategory: "membrane_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech MX Keys for Mac",
    vendor: "Logitech",
    price: 149.99,
    description: "Advanced Wireless Illuminated Keyboard.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356864/compfest/Keyboards/non-mech/wireless/LogitechMXKeysforMac_ifkn8o.webp",
    mainCategory: "keyboards",
    subCategory: "membrane_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech MX Keys Mini",
    vendor: "Logitech",
    price: 129.99,
    description: "Minimalist Wireless Illuminated Keyboard",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356864/compfest/Keyboards/non-mech/wireless/LogitechMXKeysMini_pxec5o.webp",
    mainCategory: "keyboards",
    subCategory: "membrane_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech MX Keys for Business",
    vendor: "Logitech",
    price: 149.99,
    description:
      "Boost productivity of coders, analysts and creators who need stability, precision and power to work better and truly master what they make.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356864/compfest/Keyboards/non-mech/wireless/LogiteckMXKeysforBusiness_togy2v.webp",
    mainCategory: "keyboards",
    subCategory: "membrane_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech ERGO M575 Wireless Trackball for Business",
    vendor: "Logitech",
    price: 249.99,
    description:
      "With science-driven design and easy thumb control, this wireless trackball mouse is engineered to reduce hand movement, keeping the hand and arm relaxed, providing hours of comfort.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356934/compfest/Mice/wireless/LogitechERGOM575_xldtyz.webp",
    mainCategory: "mice",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech M720 Triathlon",
    vendor: "Logitech",
    price: 69.99,
    description: "Multi-device wireless mouse.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356934/compfest/Mice/wireless/LogitechM720Triathlon_p1ziyp.webp",
    mainCategory: "mice",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech MX Master 3 for Business",
    vendor: "Logitech",
    price: 129.99,
    description:
      "Unrivaled precision and performance ideal for analysts, creators, coders, and anyone with highly specialized workflow needs.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356934/compfest/Mice/wireless/LogitechMXMaster3forBusiness_wrh753.webp",
    mainCategory: "mice",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Logitech Signature M650",
    vendor: "Logitech",
    price: 49.99,
    description: "Upgrade your setup for all-day comfort and productivity.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356934/compfest/Mice/wireless/LogitechSignatureM650_qoirmp.webp",
    mainCategory: "mice",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Gigantus V2 - XXL - ESL Edition",
    vendor: "Razer",
    price: 44.99,
    description: "Soft gaming mouse mat for speed and control.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356541/compfest/Accesories/deskMats/RazerGigantusV2_wk0zvr.png",
    mainCategory: "accessories",
    subCategory: "deskMats",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Pro Glide - XXL",
    vendor: "Razer",
    price: 34.99,
    description: "Soft mouse mat for productivity.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356541/compfest/Accesories/deskMats/RazerProGlide-XXL_dnermt.png",
    mainCategory: "accessories",
    subCategory: "deskMats",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer x *A Bathing Ape® Goliathus Speed",
    vendor: "Razer",
    price: 54.99,
    description: "Soft mat for speed gameplay.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356541/compfest/Accesories/deskMats/Razerx_ABathingApeGoliathus_gdnzfs.png",
    mainCategory: "accessories",
    subCategory: "deskMats",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer PBT Keycap Upgrade Set - Quartz Pink",
    vendor: "Razer",
    price: 39.99,
    description: "Backlight Compatible PBT Keycap Upgrade Set.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356606/compfest/Accesories/keyCaps/RazerPBTKeycapUpgradeSet-QuartzPink_damuyb.png",
    mainCategory: "accessories",
    subCategory: "keyCaps",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer PBT Keycap Upgrade Set - Razer Green",
    vendor: "Razer",
    price: 39.99,
    description: "Backlight Compatible PBT Keycap Upgrade Set.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356606/compfest/Accesories/keyCaps/RazerPBTKeycapUpgradeSet-RazerGreen_zcujgf.png",
    mainCategory: "accessories",
    subCategory: "keyCaps",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Phantom Keycap Upgrade Set - White",
    vendor: "Razer",
    price: 44.99,
    description:
      "Unique Stealth Pudding Design for Shine-through Razer Chroma RGB Lighting.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356606/compfest/Accesories/keyCaps/RazerPhantomKeycapUpgradeSet_fw8nsh.png",
    mainCategory: "accessories",
    subCategory: "keyCaps",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Goliathus Chroma - Black",
    vendor: "Razer",
    price: 59.99,
    description: "Soft Gaming Mouse Mat Powered by Razer Chroma.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356646/compfest/Accesories/mousePads/RazerGoliathusChroma_wyzl1i.png",
    mainCategory: "accessories",
    subCategory: "mousePads",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer BlackShark V2 - ESL Edition",
    vendor: "Razer",
    price: 144.99,
    description: "Multi-platform wired esports headset.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356728/compfest/Headphones/wired/RazerBlackSharkV2-ESLEdition_po1ykm.png",
    mainCategory: "headphones",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer BlackShark V2 CouRageJD Edition",
    vendor: "Razer",
    price: 159.99,
    description: "Multi-platform wired esports headset.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356728/compfest/Headphones/wired/RazerBlackSharkV2CouRage_o0jrtp.png",
    mainCategory: "headphones",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer BlackShark V2 X - Green",
    vendor: "Razer",
    price: 89.99,
    description: "Multi-platform wired esports headset.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356729/compfest/Headphones/wired/RazerBlackSharkV2X-Green_nkx2iq.png",
    mainCategory: "headphones",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer BlackShark V2 X - White",
    vendor: "Razer",
    price: 89.99,
    description: "Multi-platform wired esports headset",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356729/compfest/Headphones/wired/RazerBlackSharkV2X_wqiwqj.png",
    mainCategory: "headphones",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Kraken - Green",
    vendor: "Razer",
    price: 119.99,
    description: "Multi-Platform Wired Gaming Headset.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356729/compfest/Headphones/wired/RazerKraken-Green_yzzgcs.png",
    mainCategory: "headphones",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Kraken Ultimate",
    vendor: "Razer",
    price: 179.99,
    description: "USB Surround Sound Headset with ANC Microphone.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356729/compfest/Headphones/wired/RazerKrakenUltimate_pgticf.png",
    mainCategory: "headphones",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Kraken V3 Pro",
    vendor: "Razer",
    price: 249.99,
    description: "Wireless Gaming Headset with Haptic Technology.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356706/compfest/Headphones/wireless/RazerKrakenV3Pro_xiayjc.png",
    mainCategory: "headphones",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer BlackShark V2 Pro - Six Siege Special Edition",
    vendor: "Razer",
    price: 249.99,
    description: "Wireless esports headset.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356706/compfest/Headphones/wireless/RazerBlackSharkV2Pro_nbcatm.png",
    mainCategory: "headphones",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Nari Ultimate",
    vendor: "Razer",
    price: 279.99,
    description: "Wireless Gaming Headset with Razer HyperSense.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356706/compfest/Headphones/wireless/RazerNariUltimate_kamroy.png",
    mainCategory: "headphones",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Opus X - Green",
    vendor: "Razer",
    price: 129.99,
    description: "Wireless Low Latency Headset with ANC Technology.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356706/compfest/Headphones/wireless/RazerOpusX-Green_vtmolg.png",
    mainCategory: "headphones",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Thresher 7.1",
    vendor: "Razer",
    price: 199.99,
    description: "PC & PS4 Wireless Headset",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356706/compfest/Headphones/wireless/RazerThresher7_.1_tpu0zc.png",
    mainCategory: "headphones",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer BlackWidow Elite - Yellow Switch - US",
    vendor: "Razer",
    price: 239.99,
    description: "The Complete Mechanical Gaming Keyboard .",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356757/compfest/Keyboards/mech/wired/RazerBlackWidowElite_cjwwam.png",
    mainCategory: "keyboards",
    subCategory: "mech_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer BlackWidow V3 Mini HyperSpeed - Green Switch",
    vendor: "Razer",
    price: 239.99,
    description:
      "Wireless 65% Mechanical Gaming Keyboard with Razer Chroma™ RGB.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356785/compfest/Keyboards/mech/wireless/RazerBlackWidowV3Mini_bwh0xs.png",
    mainCategory: "keyboards",
    subCategory: "mech_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer BlackWidow V3 Pro - Green Switch",
    vendor: "Razer",
    price: 299.99,
    description: "Soft mouse pad for comfortable and effortless gliding.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356785/compfest/Keyboards/mech/wireless/RazerBlackWidowV3Pro_dmpbdz.png",
    mainCategory: "keyboards",
    subCategory: "mech_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Huntsman Mini Analog",
    vendor: "Razer",
    price: 199.99,
    description: "60% Gaming Keyboard with Analog Optical Switches.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356850/compfest/Keyboards/non-mech/wired/RazerHuntsmanMiniAnalog_s44se8.png",
    mainCategory: "keyboards",
    subCategory: "membrane_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Huntsman V2 Analog",
    vendor: "Razer",
    price: 329.99,
    description: "Gaming Keyboard with Razer™ Analog Optical Switches.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356850/compfest/Keyboards/non-mech/wired/RazerHuntsmanV2Analog_zdvh6f.png",
    mainCategory: "keyboards",
    subCategory: "membrane_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Basilisk V3",
    vendor: "Razer",
    price: 99.99,
    description: "Customizable Gaming Mouse with Razer Chroma™ RGB.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356916/compfest/Mice/wired/RazerBasiliskV3_yhuqym.png",
    mainCategory: "mice",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer DeathAdder Essential - Black",
    vendor: "Razer",
    price: 39.99,
    description: "Essential gaming mouse with 6,400 DPI optical sensor.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356916/compfest/Mice/wired/RazerDeathAdderEssential_kkifdv.png",
    mainCategory: "mice",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer DeathAdder V2 - Halo Infinite",
    vendor: "Razer",
    price: 99.99,
    description: "Wired Gaming Mouse with Best-in-class Ergonomics.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356916/compfest/Mice/wired/RazerDeathAdderV2-HaloInfinite_gmjaew.png",
    mainCategory: "mice",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Viper Mini",
    vendor: "Razer",
    price: 54.99,
    description: "Ultra-Lightweight Gaming Mouse with Razer™ Chroma RGB.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356916/compfest/Mice/wired/RazerViperMini_yjfo56.png",
    mainCategory: "mice",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Basilisk Ultimate",
    vendor: "Razer",
    price: 199.99,
    description: "Wireless Gaming Mouse with 11 Programmable Buttons.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356934/compfest/Mice/wireless/RazerBasiliskUltimate_wnybix.png",
    mainCategory: "mice",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Naga Pro",
    vendor: "Razer",
    price: 199.99,
    description: "Modular Wireless Mouse with Swappable Side Plates.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356934/compfest/Mice/wireless/RazerNagaPro_xf3j8d.png",
    mainCategory: "mice",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Pro Click Mini",
    vendor: "Razer",
    price: 99.99,
    description: "Portable Wireless Mouse for Productivity.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356934/compfest/Mice/wireless/RazerProClickMini_kifk1t.png",
    mainCategory: "accessories",
    subCategory: "mousePads",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Ducky RGB Pudding PBT Keycaps",
    vendor: "Ducky",
    price: 32.99,
    description:
      "For the most premium feel and durability these key caps are injection molded using PBT plastic for seamless lines that do not wear.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356606/compfest/Accesories/keyCaps/DuckyRGBPuddingPBTKeycaps_trwrix.png",
    mainCategory: "accessories",
    subCategory: "keyCaps",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Glorious GPBT Keycaps - Black Ash",
    vendor: "Glorious",
    price: 65.99,
    description:
      "Gorgeous cherry-profile keycaps made from super-durable PBT plastic.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356606/compfest/Accesories/keyCaps/Glorious-GPBTKeycaps-BlackAsh_y2pcd5.png",
    mainCategory: "accessories",
    subCategory: "keyCaps",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: " Tai-Hao Cubic Blue & Pink ABS Keycap Set",
    vendor: "Tai-Hao",
    price: 49.99,
    description:
      "Durable ABS double shot keycaps provide a satisfying typing experience and crisp visible legends which will never wear out.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356606/compfest/Accesories/keyCaps/Tai-HaoCubicBlue_PinkABSKeycapSet_yll2bo.png",
    mainCategory: "accessories",
    subCategory: "keyCaps",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Tai-Hao PBT Keycap Set - Hawaii",
    vendor: "Tai-Hao",
    price: 59.99,
    description:
      "For the most premium feel and durability these key caps are injection molded using PBT plastic for seamless lines that do not wear.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356606/compfest/Accesories/keyCaps/Tau-HaoPBTKeycapSet-Hawaii_ultgdr.png",
    mainCategory: "accessories",
    subCategory: "keyCaps",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Glorious Element Mouse Pads",
    vendor: "Glorious",
    price: 49.99,
    description:
      "This mouse pad is very unique with a glass-infused cloth top surface that is ultra-smooth, durable, and cool to the touch.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356646/compfest/Accesories/mousePads/GloriousStitchedClothMousepad_x6sukn.png",
    mainCategory: "accessories",
    subCategory: "mousePads",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "XTRFY GP4 Large Mouse pad ",
    vendor: "XRTFY",
    price: 79.99,
    description:
      "GP4 introduces a cloth surface with the perfect balance between speed and control.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356646/compfest/Accesories/mousePads/XtrfyGP4LargeMousepad_yyhmax.png",
    mainCategory: "accessories",
    subCategory: "mousePads",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Glorious Stealth Padded Wrist Rest",
    vendor: "Glorious",
    price: 32.99,
    description:
      "This Glorious padded keyboard wrist rest features a foam core interior and a smooth cloth surface that provides great comfort while typing.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356664/compfest/Accesories/wristWrest/GloriuosStealthPaddedWristRest_he0xak.png",
    mainCategory: "accessories",
    subCategory: "wristWrest",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "AIAIAI TMA-2 All-Round - Modular Headphones",
    vendor: "AIAIAI",
    price: 199.99,
    description:
      "The TMA-2 All-Round Modular Headphones from AIAIAI are a pre-built model with a balanced sound representation suitable for all genres. With a slim and lightweight profile, it’s the ideal choice for listening on-the-go or at home.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356728/compfest/Headphones/wired/AiaiaiTMA2AllRoundModular_lhv8g8.png",
    mainCategory: "headphones",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "AIAIAI TMA-2 HD Wireless - Modular Headphones",
    vendor: "AIAIAI",
    price: 429.99,
    description:
      "The TMA-2 HD Modular Headphones from AIAIAI are a pre-built model with a highly detailed and precise sound representation, wirelessly transmitted in HD 24-bit quality, and ultra soft over-ear cushions with Alcantara and memory foam.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356706/compfest/Headphones/wireless/AiaiaiTMA-2_HD_Wireless_x7rwug.png",
    mainCategory: "headphones",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "AIAIAI TMA-2 Move Wireless - Modular Headphones",
    vendor: "AIAIAI",
    price: 269.99,
    description:
      "The TMA-2 Move Wireless Modular Headphones from AIAIAI are a pre-built model with a balanced sound representation suitable for all genres. With high-end Bluetooth 5.0 audio and 20-hour playback time, it’s the ideal choice for wireless listening.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356706/compfest/Headphones/wireless/AiaiaiTMA-2Move_eqwcck.png",
    mainCategory: "headphones",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Glorious GMMK TKL Pre-built - Hotswap Gateron Brown",
    vendor: "Glorious",
    price: 144.99,
    description:
      "World's first RGB, modular mechanical keyboard. Comes preinstalled with Gateron brown switches & black keycaps. Ready to go - requires no setup. Perfect for someone new to mechanical keyboards.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356757/compfest/Keyboards/mech/wired/GMMKTKLPre-built_ie58ex.png",
    mainCategory: "keyboards",
    subCategory: "mech_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Glorious GMMK TKL White Ice - Hotswap Gateron Brown ",
    vendor: "Glorious",
    price: 144.99,
    description:
      "Introducing the all new GMMK 'White Ice' Edition. Give your battlestation an icy-clean upgrade with this stunning new colorway. Featuring a matte silver body, all white double-shot injection keycaps.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648408001/compfest/Keyboards/mech/wired/GMMKTKLWhiteIce-Hotswap_Gateron_Brown_vy9cjh.png",
    mainCategory: "keyboards",
    subCategory: "mech_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Havit Mechanical Keyboard",
    vendor: "Havit",
    price: 54.99,
    description:
      " Compact and Convenient. Saves space on the premise of preserving commonly used number keys .",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356757/compfest/Keyboards/mech/wired/HavitMechanicalKeyboardWired_ywmqqh.png",
    mainCategory: "keyboards",
    subCategory: "mech_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Ducky One2 RGB Full Size Mechanical Keyboard",
    vendor: "Ducky",
    price: 120.99,
    description:
      "This model of the Ducky One 2 RGB features a 100% layout which includes the Number pad, arrow and home/nav key cluster, which makes this keyboard layout best suited for professional users whether that is in an office setting, the studio or your own home workspace.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356757/compfest/Keyboards/mech/wired/One2RGBFullSize_xzhaft.png",
    mainCategory: "keyboards",
    subCategory: "mech_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Keychron K1 V4 Low Profile TKL - RGB",
    vendor: "Keychron",
    price: 149.99,
    description:
      "Featuring Gateron Low profile switches, this low profile keyboard comes in a TKL form factor with RGB back-lighting and wireless connectivity.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356785/compfest/Keyboards/mech/wireless/K1V4LowProfileTKL_odfv4q.png",
    mainCategory: "keyboards",
    subCategory: "mech_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Keychron K2 RGB Plastic Frame",
    vendor: "Keychron",
    price: 119.99,
    description:
      "The K2 by Keychron is the first all purpose wireless mechanical keyboard developed and funded by the Kickstarter community.  This model features a compact and unique 75% layout making it ideal for on the go users and those who want a clean wireless setup at home with either their PC, Mac, Linux or Android devices.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356785/compfest/Keyboards/mech/wireless/K2RGBPlasticFrame_uypwpf.png",
    mainCategory: "keyboards",
    subCategory: "mech_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Keychron K2 RGB Aluminum Frame",
    vendor: "Keychron",
    price: 129.99,
    description:
      "The K2 by Keychron is the first all purpose wireless mechanical keyboard developed and funded by the Kickstarter community.  This model features a compact and unique 75% layout making it ideal for on the go users and those who want a clean wireless setup at home with either their PC, Mac, Linux or Android devices..",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356785/compfest/Keyboards/mech/wireless/K2RGBAluminumFrame_smgnnu.png",
    mainCategory: "keyboards",
    subCategory: "mech_wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Corsair K55 RGB PRO Gaming Keyboard",
    vendor: "Corsair",
    price: 79.99,
    description:
      "Three-Zone RGB Backlighting: Customize your colors with onboard dynamic and static lighting modes.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356849/compfest/Keyboards/non-mech/wired/CorsairK55RGBPROGamingKeyboard_oetvgm.webp",
    mainCategory: "keyboards",
    subCategory: "membrane_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "HyperX Alloy Core RGB Gaming Keyboard ",
    vendor: "HyperX",
    price: 69.99,
    description:
      "Boost your performance when you add this HyperX Alloy Core gaming keyboard to your computer setup.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356850/compfest/Keyboards/non-mech/wired/HyperXAlloyCore_jnedvo.png",
    mainCategory: "keyboards",
    subCategory: "membrane_wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Ducky Feather Mouse",
    vendor: "Ducky",
    price: 89.99,
    description:
      "From the makers of the worlds top performing mechanical Keyboard, Ducky introduces the Feather, an ultra-lightweight mouse designed to take performance, durability and reliability to the highest standard that you find in all Ducky products.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356916/compfest/Mice/wired/DuckyFeather_antpbm.png",
    mainCategory: "mice",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "XRTFY M4 RGB Ultralight Gaming Mouse",
    vendor: "XRTFY",
    price: 54.99,
    description:
      "Lightweight construction, State-of-the-art components, unique right-handed shape. The M4 takes the performance, comfort and durability to the next level with this ergonomic  lightweight gaming mouse.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356916/compfest/Mice/wired/XtrfyM4RGBUltralight_zukhsa.png",
    mainCategory: "mice",
    subCategory: "wired",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Glorious Model O Wireless",
    vendor: "Glorious",
    price: 119.99,
    description:
      "Virtually zero lag with a 2.4 GHZ wireless connectivity that provides state of the art responsiveness.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356934/compfest/Mice/wireless/GloriousModelOWireless_q3xi6b.png",
    mainCategory: "mice",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "XRTFY M4 RGB Wireless Gaming Mouse ",
    vendor: "XRTFY",
    price: 119.99,
    description:
      "The Xtrfy M4 Wireless maintains the same lightweight construction, state-of-the-art components, and unique right-handed shape, but now with 2.4 GHz lag-free wireless connectivity. The M4 Wireless takes the performance, feel, and durability of a lightweight gaming mouse to the next level.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356935/compfest/Mice/wireless/XtrfyM4RGB_uckhqm.png",
    mainCategory: "mice",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
  {
    name: "Razer Orochi V2 - White",
    vendor: "Razer",
    price: 69.99,
    description:
      "Mobile Wireless Gaming Mouse with up to 950 Hours of Battery Life.",
    image:
      "https://res.cloudinary.com/cloud-513/image/upload/v1648356934/compfest/Mice/wireless/RazerOrochiV2_dsypxl.png",
    mainCategory: "mice",
    subCategory: "wireless",
    inStock: true,
    rating: 0,
    numberOfReviews: 0,
    reviews: [],
  },
];

// Convert name to slug and add slug to each product
products.forEach((product) => {
  product.slug = slugify(product.name);
});

export default products;
