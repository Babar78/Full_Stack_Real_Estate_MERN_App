import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowDropDownCircle,
} from "react-icons/md";
import data from "../../utils/accordion.jsx";
import "./Value.css";
// Demo styles, see 'Styles' section below for some notes on use.

const Value = () => {
  const [expandedItems, setExpandedItems] = useState([0]);

  const handleAccordionChange = (uuid) => {
    setExpandedItems((prevItems) => {
      if (prevItems.includes(uuid)) {
        return prevItems.filter((item) => item !== uuid);
      } else {
        return [...prevItems, uuid];
      }
    });
  };

  return (
    // add v-wrapper class to make background dark
    <section id="value" className="wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        {/* left side */}
        <div className="v-left">
          <div className="image-container">
            <img src="./value.png" alt="" />
          </div>
        </div>

        {/* right */}
        <div className="flexColStart v-right">
          <span className="orangeText">Our Value</span>

          <span className="primaryText">Value We Give to You</span>

          <span className="secondaryText">
            We always ready to help by providijng the best services for you.
            <br />
            We beleive a good blace to live can make your life better
          </span>

          <Accordion
            className="accordion"
            allowMultipleExpanded={false}
            preExpanded={expandedItems}
            onChange={handleAccordionChange}
          >
            {data.map((item, i) => {
              return (
                <AccordionItem className={`accordionItem`} uuid={i} key={i}>
                  <AccordionItemHeading>
                    <AccordionItemButton className="flexCenter accordionButton ">
                      <div className="flexCenter icon">{item.icon}</div>
                      <span className="primaryText">{item.heading}</span>
                      <div className="flexCenter icon">
                        <MdOutlineArrowDropDown size={20} />
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="secondaryText">{item.detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Value;
