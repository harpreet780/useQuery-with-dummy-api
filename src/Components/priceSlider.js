import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const PriceSlider = ({
    priceRangeValue,
    handlePriceRangeChange,
}) => {
    
    return (
        <Box className="rangeBarSize">
            <Slider
                value={priceRangeValue}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={2000}
                // getAriaValueText={"saadas"}
            />
            {console.log(priceRangeValue,"price")}
        </Box>
    )
}

export default PriceSlider;