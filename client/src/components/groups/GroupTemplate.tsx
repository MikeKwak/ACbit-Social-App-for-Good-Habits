import React, { ReactNode } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const GroupTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${palette.gray[2]};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WhiteBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logo-area {
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }

    .content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;

    background: white;
    border-radius: 2px;

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const GroupTemplate = ({ children }: { children: ReactNode }) => {
    return (
        <GroupTemplateBlock>
            <WhiteBox>
                <div className="logo-area">
                    <Link to="/">ACbit</Link>
                </div>
                <div className="content">{children}</div>
            </WhiteBox>
        </GroupTemplateBlock>
    );
};

export default GroupTemplate;
