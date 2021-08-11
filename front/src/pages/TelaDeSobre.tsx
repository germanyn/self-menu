import { Button, ButtonProps, Link as MDLink, Card, CardActions, CardContent, CardHeader, Container, Grid, makeStyles, Typography, useTheme, Box, IconButton } from "@material-ui/core";
import { Star, Whatsapp } from "mdi-material-ui";
import AppToolbar from "../layouts/AppToolbar";
import Principal from "../layouts/Principal";
import { Link } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <MDLink color="inherit" href="https://material-ui.com/">
                Self Menu
            </MDLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

type Tier = {
    title: string
    subheader?: string
    price: string
    description: string[]
    buttonText: string
    buttonVariant: ButtonProps['variant']
    link: string
}

const tiers: Tier[] = [
    {
        title: 'Gratuito',
        price: '0',
        description: [
            '1 restaurante por conta',
            'Cardápio com fotos',
        ],
        buttonText: 'Começe Agora',
        buttonVariant: 'contained',
        link: '/registrar',
    },
    // {
    //   title: 'Pro',
    //   subheader: 'Most popular',
    //   price: '15',
    //   description: [
    //     '20 users included',
    //     '10 GB of storage',
    //     'Help center access',
    //     'Priority email support',
    //   ],
    //   buttonText: 'Get started',
    //   buttonVariant: 'contained',
    // },
    // {
    //   title: 'Enterprise',
    //   price: '30',
    //   description: [
    //     '50 users included',
    //     '30 GB of storage',
    //     'Help center access',
    //     'Phone & email support',
    //   ],
    //   buttonText: 'Contact us',
    //   buttonVariant: 'outlined',
    // },
];
const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    // {
    //     title: 'Features',
    //     description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    // },
    // {
    //     title: 'Resources',
    //     description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    // },
    // {
    //     title: 'Legal',
    //     description: ['Privacy policy', 'Terms of use'],
    // },
];

export default function TelaDeSobre() {
    const classes = useStyles();
    const { spacing } = useTheme()
    return (
        <Principal
            toolbar={(props) =>
                <AppToolbar
                    {...props}
                    titulo="Sobre"
                />
            }
        >
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Self Menu
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Self Menu é uma iniciativa para pedidos em mesa de restaurantes via código QR
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} justifyContent="center" alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <Star /> : null}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h3" color="textPrimary">
                                            R${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary">
                                            /mês
                                        </Typography>
                                    </div>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={tier.buttonVariant}
                                        color="primary"
                                        component={Link}
                                        to={tier.link}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Grid container spacing={4} style={{ justifyContent: "space-evenly" }}>
                    <Grid item xs={6} sm={3}>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            gutterBottom
                            align="center"
                        >
                            Contatos
                        </Typography>
                        <ul>
                            <li style={{ textAlign: 'center' }}>
                                <IconButton
                                    href="https://api.whatsapp.com/send?phone=5547996011813"
                                    target="_blank"
                                >
                                    <Whatsapp/>
                                </IconButton>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            {/* End footer */}
        </Principal>
    )
}