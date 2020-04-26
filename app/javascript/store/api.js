import HTTPWrapper from "../utilities/HTTPWrapper";

class API {
  updateBingoTime = (path, bingoTime) =>
    HTTPWrapper.patch(`${path}`, bingoTime);

  updateHouseTime = (path, houseTime) =>
    HTTPWrapper.patch(`${path}`, houseTime);
}

export default new API();
