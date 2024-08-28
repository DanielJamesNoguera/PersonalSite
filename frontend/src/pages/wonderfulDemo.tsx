import React, { useState, useEffect } from 'react';
import { getWonderfulRedirectURL } from '../api';

const WonderfulDemo = () => {
  const [previousBankSelections, setPreviousBankSelections] = useState([] as string[]);
  const [currentBankSelection, setCurrentBankSelection] = useState(null as null | string);
  const [paymentAmount, setPaymentAmount] = useState(0.10);
  const [payeeName, setPayeeName] = useState('All Ears Audio');
  const [initialMultiBankState, setInitialMultiBankState] = useState(false);
  const [transitionBank, setTransitionBank] = useState(null as null | string);

  useEffect(() => {
    // Get previously stored bank selections from local storage
    const bankSelections = localStorage.getItem('bankSelections');

    if (bankSelections) {
      let bankSelectionsArray = JSON.parse(bankSelections);
      console.log('bankSelections', bankSelectionsArray);
      if (bankSelectionsArray.length === 1) {
        setCurrentBankSelection(bankSelectionsArray[0]);
      }
      else if (bankSelectionsArray.length > 1) {
        setInitialMultiBankState(true);
      }

      setPreviousBankSelections(bankSelectionsArray);
    }
  }, []);

  const bankCard = (bankName: string, bankColour: string, bankLogo: string, index: number) => {
    const isSelected = currentBankSelection === bankName;
    const isAbove = currentBankSelection && !isSelected;
    const indexOfSelectedBank = currentBankSelection ? bankOptions.findIndex(bank => bank.name === currentBankSelection) : null;
    const topOffsetIndexOfBank = !indexOfSelectedBank ? index : index < indexOfSelectedBank ? index : index - 1;
    let bankData = isSelected ? bankOptions.find(bank => bank.name === bankName) : null;

    let topOffset = "0px";
    if (initialMultiBankState) {
      topOffset = `${topOffsetIndexOfBank * 4 + 90}%`;
    }
    else if (currentBankSelection) {
      topOffset = isSelected ? "0px" : `${topOffsetIndexOfBank * 7 + 75}%`;
    }
    else {
      topOffset = `${index * 125 + 250}px`;
    }
    
    return (
      <>
        <div
          key={index}
          onClick={() => {
            if (currentBankSelection && currentBankSelection !== bankName) {
              setInitialMultiBankState(false);
              setCurrentBankSelection(null);
            }
            else {
              setInitialMultiBankState(false);
              setCurrentBankSelection(bankName)
            }
          }}
          className={`w-full ${isSelected ? 'rounded-t-xl' : 'rounded-xl'} card-shadow cursor-pointer overflow-hidden border border-[#bcc0c1] transition-all duration-500 ease-in-out transform ${isSelected ? 'selected' : isAbove ? 'below' : ''}`}
          style={{
            position: 'absolute',
            top: topOffset,
            left: 0,
            right: 0,
            margin: '0 auto',
            zIndex: index + 1,
            transition: 'top 0.5s ease',
          }}
        >
          <div 
            className={`flex flex-col items-center justify-between w-full h-[175px] rounded-t-xl cursor-pointer overflow-hidden p-2`}
            style={{backgroundColor: `#${bankColour}`,}}
          >
            <img src={bankLogo}
              alt={`${bankName} logo`}
              className="ml-auto h-6"
            />
            {isSelected && (
              <>
                <img src="/check-instant.png" alt={`Instant Payments`} className="h-10" />
                <div className="w-full" />
              </>
            )}
          </div>
          {isSelected && bankData &&  (
            <div key={index} className="flex flex-col items-center gap-2 py-8 bg-white">
              <p className="text-[#333333] text-center max-w-[250px] mb-4">Tap to approve this transaction in your mobile banking app...</p>
              <img 
                src={bankData?.selectionLogo} 
                alt={`${bankName} logo`} 
                className="h-16 card-shadow cursor-pointer rounded-2xl" 
                onClick={() => getBankRedirectURL(bankData ? bankData.bank_id : "monzo", bankName)}
              />
              <h3 className="text-xs uppercase">{bankName}</h3>
              <h2 className="text-3xl font-bold mt-4">£{paymentAmount.toFixed(2)}</h2>
              <p className="text-[#333333]">{payeeName}</p>
          </div>
          )}
        </div>
      </>
    );
  }

  const bankOptions = [
    {
      name: 'Monzo',
      colour: 'ff4c61',
      logo: '/monzojoint.png',
      selectionLogo: '/monzojointSelection.png',
      bank_id: "monzo",
    },
    {
      name: 'HSBC',
      colour: '000000',
      logo: '/hsbc.png',
      selectionLogo: '/revolutSelection.png',
      bank_id: "hsbc",
    },
    {
      name: 'Starling',
      colour: '6935d3',
      logo: '/starling.png',
      selectionLogo: '/starlingSelection.png',
      bank_id: "starling",
    }
  ];

  const dummyBankTransition = (bankName: string) => {
    console.log(`Transitioning to ${bankName}...`, previousBankSelections);


    setTransitionBank(bankName);
  }

  const getBankRedirectURL = async (bankId: string, bankName: string) => {
    try {

      if (!previousBankSelections.includes(bankName)) {
        console.log('Storing bank selection...');
        // Store bank selections in local storage
        localStorage.setItem('bankSelections', JSON.stringify([...previousBankSelections, bankName]));
        setPreviousBankSelections([...previousBankSelections, bankName]);
      }


      const response = await getWonderfulRedirectURL(bankId);
      console.log('page response', response);

      // Redirect to the bank's payment page
      window.location.href = `${response}?redirect`;
      
      return response;
    } catch (error) {
      console.error('Error fetching redirect URL:', error);
      throw error;
    }
  }

  return (
    <div className="max-w-screen max-h-screen h-screen w-screen flex flex-col gap-10 p-4 md:p-8 bg-[#f2f2f7] relative overflow-y-hidden">
      {transitionBank 
        ? (
          <div 
            className="w-full text-center flex flex-col items-center justify-center "
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <p>Transitioning to {transitionBank}...</p>
          </div>
          )
      : <div className="w-full flex flex-col items-center relative flex-grow">
          {bankOptions.map((bank, index) => (
            bankCard(bank.name, bank.colour, bank.logo, index)
          ))}

          {initialMultiBankState && previousBankSelections.length > 1 && (
            <div 
            className="w-full text-center flex flex-col items-center justify-center "
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <p className="text-[#333333]">Complete this payment using</p>
            <div className={`${previousBankSelections.length > 3 ? 'grid grid-cols-2' : 'flex'} gap-4 my-4`}>
              {previousBankSelections.map((bankName, index) => {
                let bank = bankOptions.find(bank => bank.name === bankName);
                if (bank && bank.name) {
                  return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <img 
                      src={bank?.selectionLogo} 
                      alt={`${bank.name ? bank.name : "monzo"} logo`} 
                      className="h-16 card-shadow cursor-pointer rounded-2xl" 
                      onClick={() => dummyBankTransition(bank ? bank.name : "monzo")}
                    />
                    <h3 className="text-xs uppercase">{bank.name ? bank.name : "monzo"}</h3>
                  </div>
                  );
                }
              })}
            </div>
            <h2 className="text-3xl font-bold">£{paymentAmount}</h2>
            <p className="text-[#333333]">{payeeName}</p>
          </div>
        )}

          {!currentBankSelection &&
            <div className="relative top-4 w-full text-center flex flex-col items-center">
              <img src="/check-instant.png" alt="Instant Payments" className="h-10 invert rounded-full" />
              <h2 className="text-3xl font-bold mt-6">£{paymentAmount.toFixed(2)}</h2>
              <p className="text-[#333333]">{payeeName}</p>
              <p className="text-[#333333] text-center max-w-[350px] mt-6">Tap to select a bank and approve this transaction in your mobile banking app.</p>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default WonderfulDemo;