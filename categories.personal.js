/**
 * Category Rules for Transaction Classification
 * 
 * HOW IT WORKS:
 * - Each key is the category name (used in QIF L-field)
 * - Each value is an array of keywords to match against transaction descriptions
 * - Matching is case-insensitive and uses "contains" (substring) matching
 * - First match wins — order matters if a keyword could match multiple categories
 * 
 * HOW TO ADD NEW CATEGORIES:
 * 1. Add a new key with your category name
 * 2. Add an array of uppercase keyword strings
 * 3. Keywords should be specific enough to avoid false matches
 * 
 * EXAMPLE:
 *   'MyCategory:Subcategory': ['KEYWORD1', 'KEYWORD2'],
 */

const CATEGORY_RULES = {
    // --- Transport ---
    'Fahrtkosten:Bus & MRT': ['BUS/MRT', 'BUS', 'MRT'],
    'Fahrtkosten:Taxi': ['GOJEK', 'RYDE'],
    'Fahrtkosten:Bike': ['HELLORIDE'],

    // --- Vehicle ---
    'Fahrzeuge:Parkgebühren': ['PARKING'],
    'Fahrzeuge:Benzin': ['SPC'],
    'Fahrzeuge:TÜV': ['VICOM'],

    // --- Food & Drink ---
    'Ernährung:Groceries': [
        'SHENG SIONG', 'FAIRPRICE', 'COLD STORAGE', 'NTUC', 'GIANT',
        'GERMANMARKETPLACE', 'REDMART', '7-ELEVEN', 'AMAZON RETAIL'
    ],
    'Ernährung:Restaurants': [
        'SUBWAY', 'RESTAURANT', 'FOOD', 'TACO', 'YOSHINOYA', 'AN LA GHIEN',
        'GYG', 'OMOTE', 'PIZZERIA', 'PIZZA', 'ROLLIE OLIE', 'BANGKOK JAM',
        'WOK HEY', 'MRS PHO', 'HAI DI LAO', "THAI'D ME UP", 'OH SOME BOWLS',
        'DIM SUM', 'WINE CONNECTION', 'VIETNAMESE DELIGHTS', 'AL BORGO',
        'STUFF', 'MERCI MARCEL', 'LOTUS NGUYEN', 'KAZBAR', 'SPIZZA',
        'KEBAB', 'MCDONALD', 'ENSEEDS', 'CO CHUNG', 'PPUNCH', 'SUSHI BAR',
        'WARMUPCAFE', 'OPERETTA CORNER BAR', 'AUTHENTIC THAI',
        'MEXICAN FOOD CORP', 'BROTZEIT', 'SUSHI-TEI'
    ],
    'Ernährung:Coffee': [
        'MORNING GRIND', 'ALCHEMIST', 'COFFEE', 'ESPRESSO',
        'ROUND BOY ROASTERS', 'MADROASTER', 'CAFFEINATION', 'KURASU'
    ],
    'Ernährung:Getränke': ['BOOST JUICE'],
    'Ernährung:Foodcourt': [
        'PEPPER LUNCH', 'KOOPITIAM', 'AMOY ST FC', 'SG F&B MANAGEMENT',
        'PBK EATING HOUSE', 'BK EATING HOUSE', 'KOPITIAM'
    ],

    // --- Payments & Banking ---
    '[SG-HSBC-Premier]': ['GIRO PAYMENT', 'PAYMENT', 'THANK YOU'],
    '[SG-YouTrip-SGD]': ['YOUTRIP'],
    'Kreditkartenkosten': ['ANNUAL MEMBER FEE', 'MEMBERSHIP FEE', 'GST ON MEMBERSHIP'],
    'Zinseinkünfte': ['CR INTEREST'],
    'Cashback': ['UOB ABSOLUTE CASHBACK', 'CASHBACK'],

    // --- Personal Care ---
    'Friseur': ['JEAN YIP'],

    // --- Health ---
    'Krankheitskost.:Arzt': ['PARKWAY DENTAL', 'SEOW-CHOEN COLORECTA', 'TOOFDOCTOR'],
    'Krankheitskost.:Physio': ['CALIBRATE HEALTH'],
    'Krankheitskost.:Medikamente': ["WATSON'S"],

    // --- Housing & Utilities ---
    'Nebenk. Wohnung:Telefon': ['GOMO MOBILE'],
    'Nebenk. Wohnung:Internet': ['STARHUB RECUR'],

    // --- Pets ---
    'Pets:Food': ['PET LOVERS'],

    // --- Leisure ---
    'Freizeit:Drinks': ['DRUGGISTS', 'KULT KAFE', 'BREWERKZ', 'HARRY', 'MORTAR AND PESTLE', 'BAR NKD'],
    'Freizeit:Kino': ['THEATRES'],
    'Freizeit:Sport': ['SUPERBOWL'],
    'Freizeit:Massage': ['NATURELAND'],

    // --- Travel ---
    'Reise:Hotelkosten': ['ALOFT', 'HOTEL']
};
