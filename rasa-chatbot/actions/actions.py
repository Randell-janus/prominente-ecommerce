# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List  

from rasa_sdk import Action, Tracker, FormValidationAction
from rasa_sdk.events import EventType, AllSlotsReset
from rasa_sdk.executor import CollectingDispatcher

GLASS_DB = [
    {"type": "clear", "thickness": "1/8", "initial": 25},
    {"type": "clear", "thickness": "3/16", "initial": 39},
    {"type": "clear", "thickness": "1/4", "initial": 42},

    {"type": "smoke", "thickness": "1/8", "initial": 26},
    {"type": "smoke", "thickness": "3/16", "initial": 40},
    {"type": "smoke", "thickness": "1/4", "initial": 43},
    
    {"type": "bronze", "thickness": "1/8", "initial": 40},
    {"type": "bronze", "thickness": "3/16", "initial": 43},
    {"type": "bronze", "thickness": "1/4", "initial": 45},

    {"type": "mirror", "thickness": "1/8", "initial": 45},
    {"type": "mirror", "thickness": "3/16", "initial": 60},
    {"type": "mirror", "thickness": "1/4", "initial": 75},

    {"type": "reflective", "thickness": "1/8", "initial": 55},
    {"type": "reflective", "thickness": "3/16", "initial": 70},
    {"type": "reflective", "thickness": "1/4", "initial": 85},

    {"type": "blue", "thickness": "1/8", "initial": 60},
    {"type": "blue", "thickness": "3/16", "initial": 78},
    {"type": "blue", "thickness": "1/4", "initial": 92},
]

GLASS_MATERIALS = ["ordinary", "tempered"]
GLASS_TYPES = ["clear", "blue", "smoke", "bronze", "mirror", "reflective"]
GLASS_THICKNESS = ["1/8", "3/16", "1/4"]


SLIDING_MATERIALS = ["Lockstile", "Interlocker", "Bottom rail", "Double head", "Double sill", "Double jamb"]
AWNING_DOOR_MATERIALS = ["ED Stile w/ groove", "ED Bottom", "ED Top"]
AWNING_WINDOW_MATERIALS = ["Series38 Panel", "Series38 Moulding", "Series38 Perimeter"]

RECOMMENDATION_DB = [
    {"product": "door", "type": "sliding", "budget": "low", "glass": "clear", "finish": "silver", "alum": SLIDING_MATERIALS},
    {"product": "door", "type": "sliding", "budget": "mid", "glass": "bronze", "finish": "brown", "alum": SLIDING_MATERIALS},
    {"product": "door", "type": "sliding", "budget": "high", "glass": "blue", "finish": "white", "alum": SLIDING_MATERIALS},

    {"product": "door", "type": "awning", "budget": "low", "glass": "clear", "finish": "silver", "alum": AWNING_DOOR_MATERIALS},
    {"product": "door", "type": "awning", "budget": "mid", "glass": "bronze", "finish": "brown", "alum": AWNING_DOOR_MATERIALS},
    {"product": "door", "type": "awning", "budget": "high", "glass": "blue", "finish": "white", "alum": AWNING_DOOR_MATERIALS},

    {"product": "window", "type": "sliding", "budget": "low", "glass": "clear", "finish": "silver", "alum": SLIDING_MATERIALS},
    {"product": "window", "type": "sliding", "budget": "mid", "glass": "bronze", "finish": "brown", "alum": SLIDING_MATERIALS},
    {"product": "window", "type": "sliding", "budget": "high", "glass": "blue", "finish": "white", "alum": SLIDING_MATERIALS},

    {"product": "window", "type": "awning", "budget": "low", "glass": "clear", "finish": "silver", "alum": AWNING_WINDOW_MATERIALS},
    {"product": "window", "type": "awning", "budget": "mid", "glass": "bronze", "finish": "brown", "alum": AWNING_WINDOW_MATERIALS},
    {"product": "window", "type": "awning", "budget": "high", "glass": "blue", "finish": "white", "alum": AWNING_WINDOW_MATERIALS},
]

ALLOWED_PRODUCTS = ["door", "window"]
ALLOWED_PRODUCT_TYPES = ["sliding", "awning"]
ALLOWED_BUDGET_TYPES = ["low", "mid", "high"]


class ValidateGlassPriceForm(FormValidationAction):

    def name(self) -> Text:
        return "validate_glass_price_form"

    def validate_glass_material(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher, 
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        if slot_value.lower() not in GLASS_MATERIALS:
            msg = "I don't recognize that material."
            dispatcher.utter_message(text=msg)
            return {"glass_material": None}

        dispatcher.utter_message(text=f"Material is {slot_value}.")
        return {"glass_material": slot_value}

    def validate_glass_type(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher, 
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        if slot_value.lower() not in GLASS_TYPES:
            msg = "I don't recognize that type."
            dispatcher.utter_message(text=msg)
            return {"glass_type": None}

        # dispatcher.utter_message(text=f"Type is {slot_value}.")
        return {"glass_type": slot_value}

    def validate_glass_thickness(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher, 
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        if slot_value not in GLASS_THICKNESS:
            msg = "I don't recognize that variant."
            dispatcher.utter_message(text=msg)
            return {"glass_thickness": None}

        # dispatcher.utter_message(text=f"Variant is {slot_value}.")
        return {"glass_thickness": slot_value}

    def validate_glass_dimension(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher, 
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        
        slot = slot_value.replace(" ", "").lower()

        # dispatcher.utter_message(text=f"Dimension is {slot} sqft.")
        return {"glass_dimension": slot_value}

    def validate_qty(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher, 
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        # dispatcher.utter_message(text=f"Quantity is {slot_value}.")
        return {"qty": slot_value}


class ActionComputeGlassPrice(Action):

    def name(self) -> Text:
        return "action_compute_glass_price_form"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        glass_material = tracker.get_slot("glass_material")
        glass_type = tracker.get_slot("glass_type")
        glass_thickness = tracker.get_slot("glass_thickness")
        glass_dimension = tracker.get_slot("glass_dimension")
        qty = float(tracker.get_slot("qty"))

        # print(type(qty))

        price = 0

        dimensions = glass_dimension.replace(" ", "").lower().split("x")
        glass_height = float(dimensions[0])
        glass_width = float(dimensions[1])

        for dict in GLASS_DB:
            if (dict['type'] == glass_type) and (dict['thickness'] == glass_thickness):
                initial = dict['initial']

                if glass_material == 'tempered':
                    price = initial * 4 * glass_height * glass_width * qty
                    dispatcher.utter_message(text=f"The total price is ₱ {price} pesos")

                    return [AllSlotsReset()]

                price = initial * glass_height * glass_width * qty

        dispatcher.utter_message(text=f"The total price is ₱ {price} pesos")
        return [AllSlotsReset()]


class ValidateRecommendForm(FormValidationAction):

    def name(self) -> Text:
        return "validate_recommend_form"

    def validate_product(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher, 
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        if slot_value.lower() not in ALLOWED_PRODUCTS:
            msg = "I don't recognize that product."
            dispatcher.utter_message(text=msg)
            return {"product": None}
        # dispatcher.utter_message(text=f"Product is {slot_value}.")
        return {"product": slot_value}

    def validate_product_type(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher, 
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        if slot_value.lower() not in ALLOWED_PRODUCT_TYPES:
            msg = "I don't recognize that type."
            dispatcher.utter_message(text=msg)
            return {"product_type": None}
        # dispatcher.utter_message(text=f"Type is {slot_value}.")
        return {"product_type": slot_value}

    def validate_budget(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher, 
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        if slot_value not in ALLOWED_BUDGET_TYPES:
            msg = "Please select among the given ranges."
            dispatcher.utter_message(text=msg)
            return {"budget": None}

        # dispatcher.utter_message(text=f"Your budget is in range {slot_value}.")
        return {"budget": slot_value}


class ActionRecommend(Action):

    def name(self) -> Text:
        return "action_recommend_form"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        product = tracker.get_slot("product")
        product_type = tracker.get_slot("product_type")
        budget = tracker.get_slot("budget")

        for dict in RECOMMENDATION_DB:
            if (dict['product'] == product) and (dict['type'] == product_type) and (dict['budget'] == budget):
                glass = dict['glass']
                alum = dict['alum']
                finish = dict['finish']

                alumRecommendation = f"For a {product_type} {product}, you will be needing these materials: {', '.join(alum)}"
                glassRecommendation = f"For your budget I'll recommend a {finish} aluminum finish paired with a {glass} glass."

        dispatcher.utter_message(text=alumRecommendation)
        dispatcher.utter_message(text=glassRecommendation)
        return [AllSlotsReset()]


class ActionResetSlots(Action):

    def name(self) -> Text:
        return "action_reset_slots"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text=f"Okay sure.")
        return [AllSlotsReset()]

