const express = require("express");
const router = express();
const stateController = require("../../controller/stateController");

router
  .route("/")
    .get(stateController.getAllStates)

router
  .route("/:id")
    .get(stateController.getState)
router
  .route("/:id/admission")
    .get(stateController.getStateAdmission)
router
  .route("/:id/capital")
    .get(stateController.getStateCapital)
router
  .route("/:id/nickname")
    .get(stateController.getStateNickname)
router
  .route("/:id/population")
    .get(stateController.getStatePopulation)
router
  .route("/:id/funfact")
  .get(stateController.getStateFunFact)
  .post(stateController.addFacts)
  .patch(stateController.updateFact)
  .delete(stateController.deleteFact)


module.exports = router;
