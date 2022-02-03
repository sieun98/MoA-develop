import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "components/home/Home";
import Gather from "components/gather/Gather";
import Save from "components/save/Save";
import Compete from "components/compete/Compete";
import Profile from "components/profile/Profile";
import CompeteDetail from "components/compete/CompDetail";
import AddMilitarySavings from "components/gather/addMilitarySavings/AddMilitarySavings";
import AvailableSavingItemDetail from "components/gather/addMilitarySavings/AvailableSavingItemDetail";
import AddMilitarySavingsTerm from "components/gather/addMilitarySavings/AddMilitarySavingsTerm";
import AddMilitarySavingsForm from "components/gather/addMilitarySavings/AddMilitarySavingsForm";
import AddMilitarySavingSuccess from "components/gather/addMilitarySavings/AddMilitarySavingSucess";
import SafeBox from "components/gather/safebox/SafeBox";
import Goal from "components/gather/addGoal/Goal";
import Complete from "components/gather/addGoal/Complete";
import MobileKeypad from "components/gather/safebox/MobileKeypad";
import CompHowTo from "components/compete/CompHowTo";
import KeyPopUp from "components/common/KeyPopUp";
import Reward from "components/reward/Reward";
import MyReward from "components/reward/MyReward";
import MyProducItemDetail from "components/reward/MyProducItemDetail";
import GatherDetail from "components/gather/GatherDetail";
import EditGoal from "components/gather/EditGoal";
import EditDeposit from "components/gather/EditDeposit";
import MidTermTermination from "components/gather/MidTermTermination";
import MyBoxOpen from "components/reward/MyBoxOpen";
import RegisterDeposit from "components/gather/RegisterDeposit";
import AdditionalSafebox from "components/gather/AdditionalSafebox";
import MilitaryDetail from "components/gather/MilitaryDetail";
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/gather" element={<Gather />} />
      <Route
        path="/gather/add-militarySaving"
        element={<AddMilitarySavings />}
      />
      <Route
        path="/gather/add-militarySaving/:bankname"
        element={<AvailableSavingItemDetail />}
      />
      <Route
        path="/gather/add-militarySaving/:bankname/term"
        element={<AddMilitarySavingsTerm />}
      />
      <Route
        path="/gather/add-militarySaving/:bankname/term/form"
        element={<AddMilitarySavingsForm />}
      />
      <Route
        path="/gather/add-militarySaving/:bankname/term/form/success"
        element={<AddMilitarySavingSuccess />}
      />
      <Route path="/gather/add-goal" element={<Goal />} />
      <Route path="/gather/add-goal/complete" element={<Complete />} />
      <Route path="/gather/add-safebox" element={<SafeBox />} />
      <Route path="/gather/add-safebox/complete" element={<Complete />} />
      <Route path="/gather/detail" element={<GatherDetail />} />
      <Route path="/gather/detail/edit-goal" element={<EditGoal />} />
      <Route path="/gather/detail/edit-deposit" element={<EditDeposit />} />
      <Route
        path="/gather/detail/additional-safebox"
        element={<AdditionalSafebox />}
      />
      <Route
        path="/gather/detail/register-deposit"
        element={<RegisterDeposit />}
      />
      <Route
        path="/gather/detail/midterm-termination"
        element={<MidTermTermination />}
      />
      <Route path="/gather/mili-detail" element={<MilitaryDetail />}></Route>
      <Route path="/save" element={<Save />} />
      <Route path="/compete" element={<Compete />} />
      <Route path="/compete/howto" element={<CompHowTo />} />
      <Route path="/compete/:id" element={<CompeteDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/keypad" element={<MobileKeypad />} />
      <Route path="/key" element={<KeyPopUp />}></Route>
      <Route path="/reward" element={<Reward />} />
      <Route path="/reward/:userId" element={<MyReward />} />
      <Route
        path="/reward/:userId/:productId"
        element={<MyProducItemDetail />}
      />
      <Route path="/reward/:userId/select/:boxId" element={<MyBoxOpen />} />
    </Routes>
  );
}

export default AllRoutes;
