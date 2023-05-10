const data = {
  states: require("../model/states.json"),
  setStates(data) {
    this.states = data;
  },
};

const States = require("../model/States");

const getAllStates = async (req, res) => {
  let output = [];
  const states = await States.find().exec();

  data.states.forEach((state)=>{
    if( req.query.contig === 'true' 
        && (state.code == 'AK' || state.code == 'HI'))
      return;
    if( req.query.contig === 'false' 
        && !(state.code == 'AK' || state.code == 'HI'))
      return;
    
    const statefacts = states.find( x => x.stateCode == state.code);
    if(statefacts) output.push({...state, funfacts: statefacts.funfacts});
    else output.push(state);
  })

  res.json(output);
};

const addFacts = async (req, res) => {

  const state = await States.findOne({stateCode:req.params.id}).exec();

  if(state)
  {
    state.funfacts = [...state.funfacts, ...req.body.funfacts];
    res.json(await state.save())
  }
  else
  {
    const newState = new States({
      stateCode: req.params.id,
      funfacts: req.body.funfacts
    });
    
    res.json(await newState.save())
  }


};

const updateFact = async (req, res) => {

  const state = await States.findOne({stateCode:req.params.id}).exec();

  if(state)
  {
    try
    {
      state.funfacts[req.body.index-1] = req.body.funfact;
      res.json( await state.save() );
    }
    catch(err)
    {
      res
      .status(400)
      .json( { message : err } )
    }
  }
  else
  {
    res
    .status(400)
    .json({ message: `State ID ${req.body.id} not found` });
  }

};

const deleteFact = async (req, res) => {
  const state = await States.findOne({stateCode:req.params.id}).exec();

  if(state)
  {
    try
    {
      state.funfacts.splice(req.body.index-1, 1);
      res.json( await state.save() );
    }
    catch(err)
    {
      res
      .status(400)
      .json( { message : err } )
    }
  }
  else
  {
    res
    .status(400)
    .json({ message: `State ID ${req.body.id} not found` });
  }
};


const getState = async (req, res) => {
  const stateId = req.params.id;
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }
  const state2 = await States.findOne({stateCode: stateId}).exec();

  if(state2) state.funfacts = state2.funfacts
  res.json(state);
};


const getStateCapital = (req, res) => {
  const stateId = req.params.id;
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }
  res.json(
    { 
      state: state.state,
      capital: state.capital_city
    }
  );
};

const getStateNickname = (req, res) => {
  const stateId = req.params.id; 
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }
  res.json(
    { 
      state: state.state,
      nickname: state.nickname
    }
  );
};

const getStatePopulation = (req, res) => {
  const stateId = req.params.id;
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }
  res.json(
    { 
      state: state.state,
      population: state.admission_number
    }
  );
};

const getStateAdmission = (req, res) => {
  const stateId = req.params.id; 
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }
  res.json(
    { 
      state: state.state,
      admitted: state.admission_number
    }
  );
};

const getStateFunFact = async (req, res) => {
  const stateId = req.params.id;
  const state = await States.findOne({ stateCode: req.params.id }).exec();

   console.log(state)

  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  res.json(
    { 
      funfact: state.funfacts[Math.floor(Math.random()*state.funfacts.length)]
    }
  );
};


module.exports = {
  getAllStates,
  updateFact,
  addFacts,
  deleteFact,
  getState,
  getStateAdmission,
  getStateCapital,
  getStateNickname,
  getStatePopulation,
  getStateFunFact
};
