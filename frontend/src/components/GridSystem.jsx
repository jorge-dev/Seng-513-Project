import {Container, Row, Col} from 'react-bootstrap'
import React from 'react'

export default function GridSystem({colCount, children, md}) {
    const rowCount = Math.floor(children.length / colCount) + 1;
    let index = 0;

    const buildGrid = () => {
        return(
            renderRows()
        );
    }

    const renderRows = () => {
        let rows = [];

        for (let row = 0; row < rowCount; row++) {
            rows.push(
                <Row>
                    {
                        renderCols()
                    }
                </Row>
            )
        }
        return rows;
    }

    const renderCols = () => {
        let cols = [];

        for (let col = 0; col < colCount; col++) {
            if(index < children.length) {
                cols.push(
                    <Col>
                        {children[index]}
                    </Col>
                )
                index++;
            }
        }

        return cols;
    }
    return (
        <Container className='grid-container'>
            {
                buildGrid()
            }
        </Container>
    );
}
