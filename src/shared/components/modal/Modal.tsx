import { Modal as MuiModal, Paper, type ModalProps as MuiModalProps, Box, Typography, IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import React from "react";

type ModalProps = Omit<MuiModalProps, 'children'> & {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode;
    width?: number | string;
    height?: number | string;
};

const ModalContext = React.createContext<{ onClose: () => void } | null>(null);

export default function Modal({ open, onClose, width, height, children }: ModalProps) {
    return (
        <ModalContext value={{ onClose }}>
            <MuiModal 
                open={open}
                onClose={onClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: { sm: 2 }
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        width: { 
                            xs: '100dvw', 
                            sm: width || 'auto' 
                        },
                        height: { 
                            xs: '100dvh', 
                            sm: height || 'auto' 
                        },
                        maxWidth: { sm: '100%' },
                        maxHeight: { sm: '100%' },
                        borderRadius: { xs: 0, sm: 2 },
                        flexDirection: 'column'
                    }}
                >
                    {children}
                </Paper>
            </MuiModal>
        </ModalContext>
        
    );
};

type ModalHeaderProps = {
    children: React.ReactNode;
};

Modal.Header = function Header({ children }: ModalHeaderProps) {
    const ctx = React.useContext(ModalContext);
  
    if (!ctx) {
      throw new Error("Modal.Header must be used inside <Modal>");
    }
  
    const { onClose } = ctx;
  
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            minHeight: 60,
            p: 2,
            // pb: 0,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <Typography px="1" variant="h6">
            {children}
          </Typography>
  
          <IconButton onClick={onClose} aria-label="Close popup">
            <CloseOutlined />
          </IconButton>
        </Box>
      </>
    );
  };
  

Modal.Content = function Content({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {children}
        </Box>
    );
};

Modal.Footer = function Footer({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Box 
                sx={{
                    minHeight: '60px',
                    padding: 2,
                    flexShrink: 0
                }}
            >
                {children}
            </Box>
        </>
    );
};