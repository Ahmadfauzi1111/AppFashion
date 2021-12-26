import React from 'react';
import {Box, Text, BorderlessTap} from "../../components";
import SocialLogin from "./SocialLogin";

interface FooterProps {
    onPress: () => void;
    title: string;
    action: string;
}

const Footer = ({ onPress, title, action }: FooterProps) => {

    return (
        <>
            <SocialLogin />
            <Box alignItems="center" marginTop="m" marginBottom="m">
                <BorderlessTap { ...{ onPress } }>
                    <Text variant="button" color="background">
                        <Text fontSize={13}>{`${title} `}</Text>
                        <Text
                            fontSize={14}
                            marginLeft="s"
                            variant="button"
                            color="primary"
                        >
                            {action}
                        </Text>
                    </Text>
                </BorderlessTap>
            </Box>
        </>
    );
};

export default Footer;
