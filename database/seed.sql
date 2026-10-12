--
-- PostgreSQL database dump
--

\restrict zjL7vuXVBOMqJw8Y9WbrXn3vI0aVEuiKiQTqhddJe0Dim6GfajeTnZoZ2C9U30G

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: AuditAction; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."AuditAction" AS ENUM (
    'CREATE',
    'UPDATE',
    'DELETE',
    'REFUND',
    'APPROVE',
    'REJECT',
    'CANCEL',
    'LOGIN',
    'LOGOUT',
    'KYC_SUBMIT',
    'KYC_APPROVE',
    'KYC_REJECT'
);


--
-- Name: BadgeRarity; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BadgeRarity" AS ENUM (
    'common',
    'rare',
    'epic',
    'legendary'
);


--
-- Name: BadgeType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BadgeType" AS ENUM (
    'custom',
    'achievement'
);


--
-- Name: BlacklistType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BlacklistType" AS ENUM (
    'IP',
    'EMAIL',
    'PHONE',
    'BANK_ACCOUNT',
    'DEVICE_ID',
    'WORD'
);


--
-- Name: BlogCommentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BlogCommentStatus" AS ENUM (
    'VISIBLE',
    'HIDDEN',
    'DELETED',
    'PENDING_REVIEW'
);


--
-- Name: BlogPostStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BlogPostStatus" AS ENUM (
    'DRAFT',
    'PENDING_REVIEW',
    'PUBLISHED',
    'ARCHIVED',
    'REJECTED'
);


--
-- Name: BlogPostType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BlogPostType" AS ENUM (
    'PLATFORM',
    'CAMPAIGN_UPDATE',
    'ANNOUNCEMENT',
    'STORY',
    'IMPACT_REPORT'
);


--
-- Name: BlogReportReason; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BlogReportReason" AS ENUM (
    'SPAM',
    'ABUSE',
    'MISINFORMATION',
    'SCAM',
    'INAPPROPRIATE',
    'OTHER'
);


--
-- Name: BlogVisibility; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BlogVisibility" AS ENUM (
    'PUBLIC',
    'BACKERS_ONLY',
    'OWNER_ONLY',
    'PRIVATE'
);


--
-- Name: CampaignCommentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CampaignCommentStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'HIDDEN',
    'DELETED'
);


--
-- Name: CampaignReportReason; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CampaignReportReason" AS ENUM (
    'FRAUD',
    'INAPPROPRIATE',
    'MISLEADING',
    'SCAM',
    'INTELLECTUAL_PROPERTY',
    'OTHER'
);


--
-- Name: CampaignStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CampaignStatus" AS ENUM (
    'DRAFT',
    'PENDING_REVIEW',
    'ACTIVE',
    'SUCCESS',
    'FAILED',
    'CANCELED'
);


--
-- Name: CampaignType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CampaignType" AS ENUM (
    'REWARD',
    'DONATION'
);


--
-- Name: CertificateStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CertificateStatus" AS ENUM (
    'ISSUED',
    'CLAIMED',
    'REVOKED'
);


--
-- Name: CheckoutSessionStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CheckoutSessionStatus" AS ENUM (
    'ACTIVE',
    'COMPLETED',
    'EXPIRED',
    'CANCELLED'
);


--
-- Name: DigitalAssetStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."DigitalAssetStatus" AS ENUM (
    'AVAILABLE',
    'RESERVED',
    'DELIVERED',
    'CLAIMED',
    'REVOKED'
);


--
-- Name: FulfillmentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."FulfillmentStatus" AS ENUM (
    'NOT_APPLICABLE',
    'AWAITING_PAYMENT',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'DELIVERY_FAILED',
    'CANCELED',
    'RETURN_REQUESTED',
    'RETURNED'
);


--
-- Name: FundingModel; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."FundingModel" AS ENUM (
    'ALL_OR_NOTHING',
    'KEEP_IT_ALL'
);


--
-- Name: IDCardType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."IDCardType" AS ENUM (
    'CMND',
    'CCCD',
    'PASSPORT'
);


--
-- Name: InvoiceStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."InvoiceStatus" AS ENUM (
    'PENDING',
    'PAID',
    'OVERDUE',
    'CANCELLED'
);


--
-- Name: KYCStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KYCStatus" AS ENUM (
    'PENDING',
    'VERIFIED',
    'REJECTED',
    'EXPIRED'
);


--
-- Name: MoneyFlowType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."MoneyFlowType" AS ENUM (
    'NO_GIFT',
    'GIFT_NOW',
    'PREORDER'
);


--
-- Name: PaymentMethodStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentMethodStatus" AS ENUM (
    'ACTIVE',
    'REVOKED'
);


--
-- Name: PaymentMethodType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentMethodType" AS ENUM (
    'CARD',
    'BANK_ACCOUNT',
    'MOMO',
    'ZALOPAY'
);


--
-- Name: PledgeStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PledgeStatus" AS ENUM (
    'PENDING',
    'SUCCESS',
    'FAILED',
    'REFUNDED'
);


--
-- Name: RefundStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RefundStatus" AS ENUM (
    'NO_REFUND',
    'REQUESTED',
    'PROCESSING',
    'COMPLETED',
    'FAILED'
);


--
-- Name: ReportStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ReportStatus" AS ENUM (
    'PENDING',
    'REVIEWING',
    'RESOLVED',
    'DISMISSED'
);


--
-- Name: ReportTargetType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ReportTargetType" AS ENUM (
    'CAMPAIGN',
    'PROJECT',
    'PRODUCT',
    'BLOG',
    'PROFILE'
);


--
-- Name: RewardAvailability; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RewardAvailability" AS ENUM (
    'AVAILABLE',
    'DEVELOPMENT'
);


--
-- Name: RewardFulfillmentType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RewardFulfillmentType" AS ENUM (
    'PHYSICAL',
    'EMAIL',
    'DOWNLOAD',
    'LICENSE_KEY',
    'DIGITAL_COMIC'
);


--
-- Name: RiskLevel; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RiskLevel" AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
);


--
-- Name: TaxDocumentKind; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TaxDocumentKind" AS ENUM (
    'CERTIFICATE',
    'RECEIPT'
);


--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'BACKER',
    'CREATOR_PENDING',
    'CREATOR'
);


--
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserStatus" AS ENUM (
    'NORMAL',
    'PRO',
    'BANNED'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _blog_postsTorewards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_blog_postsTorewards" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: activity_logs_v2; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity_logs_v2 (
    id text NOT NULL,
    "userId" text,
    action character varying(64) NOT NULL,
    "entityType" character varying(64) NOT NULL,
    "entityId" text NOT NULL,
    details jsonb,
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: analytics_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.analytics_events (
    id text NOT NULL,
    "eventName" character varying(64) NOT NULL,
    "userId" text,
    "campaignId" text,
    "sessionId" text,
    path text,
    payload jsonb,
    device jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: analytics_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.analytics_settings (
    id text DEFAULT 'behavior'::text NOT NULL,
    "ttlDays" integer DEFAULT 180 NOT NULL,
    "updatedBy" text,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: assistant_telemetry_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assistant_telemetry_events (
    id text NOT NULL,
    assistant character varying(64) NOT NULL,
    "eventType" character varying(64) NOT NULL,
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.audit_logs (
    id text NOT NULL,
    "userId" text,
    action public."AuditAction" NOT NULL,
    "entityType" text NOT NULL,
    "entityId" text NOT NULL,
    "oldValue" jsonb,
    "newValue" jsonb,
    changes jsonb,
    "ipAddress" text,
    "userAgent" text,
    reason text,
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: backer_invoices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.backer_invoices (
    id text NOT NULL,
    "invoiceNumber" text NOT NULL,
    "pledgeId" text NOT NULL,
    "backerName" text NOT NULL,
    "backerEmail" text,
    "backerPhone" text,
    "backerAddress" text,
    "backerTaxCode" text,
    "companyName" text,
    amount numeric(65,30) NOT NULL,
    "tipAmount" numeric(65,30) NOT NULL,
    "platformFee" numeric(65,30) NOT NULL,
    "vatAmount" numeric(65,30) NOT NULL,
    "totalAmount" numeric(65,30) NOT NULL,
    "campaignTitle" text NOT NULL,
    "paymentMethod" text NOT NULL,
    "transactionId" text NOT NULL,
    status public."InvoiceStatus" DEFAULT 'PENDING'::public."InvoiceStatus" NOT NULL,
    "issuedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "pdfUrl" text,
    "sentAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: badges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.badges (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(120) NOT NULL,
    description text,
    icon_url text,
    icon_name character varying(100),
    color character varying(30),
    background_color character varying(30),
    type public."BadgeType" NOT NULL,
    rarity public."BadgeRarity" DEFAULT 'common'::public."BadgeRarity" NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


--
-- Name: blacklist; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blacklist (
    id text NOT NULL,
    type public."BlacklistType" NOT NULL,
    value text NOT NULL,
    reason text NOT NULL,
    "addedBy" text,
    "isActive" boolean DEFAULT true NOT NULL,
    "expiresAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: blog_bookmarks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_bookmarks (
    id text NOT NULL,
    "postId" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: blog_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_categories (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: blog_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_comments (
    id text NOT NULL,
    "postId" text NOT NULL,
    "userId" text NOT NULL,
    "parentId" text,
    content text NOT NULL,
    status public."BlogCommentStatus" DEFAULT 'VISIBLE'::public."BlogCommentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


--
-- Name: blog_drafts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_drafts (
    id text NOT NULL,
    "postId" text NOT NULL,
    "authorId" text NOT NULL,
    "titleSnapshot" text,
    "excerptSnapshot" text,
    "contentSnapshot" text,
    "richContentSnapshot" jsonb,
    "autosavedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: blog_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_likes (
    id text NOT NULL,
    "postId" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: blog_post_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_post_categories (
    "postId" text NOT NULL,
    "categoryId" text NOT NULL
);


--
-- Name: blog_post_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_post_tags (
    "postId" text NOT NULL,
    "tagId" text NOT NULL
);


--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_posts (
    id text NOT NULL,
    "authorId" text NOT NULL,
    "campaignId" text,
    "projectId" text,
    "mongoContentId" text,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    excerpt text,
    "coverImage" text,
    status public."BlogPostStatus" DEFAULT 'DRAFT'::public."BlogPostStatus" NOT NULL,
    type public."BlogPostType" DEFAULT 'PLATFORM'::public."BlogPostType" NOT NULL,
    visibility public."BlogVisibility" DEFAULT 'PUBLIC'::public."BlogVisibility" NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "viewCount" integer DEFAULT 0 NOT NULL,
    "likeCount" integer DEFAULT 0 NOT NULL,
    "commentCount" integer DEFAULT 0 NOT NULL,
    "bookmarkCount" integer DEFAULT 0 NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "wordCount" integer DEFAULT 0 NOT NULL,
    "readingTimeMinutes" integer DEFAULT 0 NOT NULL,
    content text
);


--
-- Name: blog_reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_reports (
    id text NOT NULL,
    "postId" text,
    "commentId" text,
    "reporterId" text NOT NULL,
    reason public."BlogReportReason" NOT NULL,
    description text,
    status public."ReportStatus" DEFAULT 'PENDING'::public."ReportStatus" NOT NULL,
    "reviewedBy" text,
    "reviewedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: blog_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_tags (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL
);


--
-- Name: blog_versions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_versions (
    id text NOT NULL,
    "postId" text NOT NULL,
    "versionNumber" integer NOT NULL,
    "authorId" text NOT NULL,
    "titleSnapshot" text,
    "excerptSnapshot" text,
    "contentSnapshot" text,
    "richContentSnapshot" jsonb,
    "changeNote" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: blog_view_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_view_logs (
    id text NOT NULL,
    "postId" text NOT NULL,
    "userId" text,
    ip text,
    "userAgent" text,
    "viewedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: campaign_blog_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_blog_links (
    id text NOT NULL,
    "campaignId" text NOT NULL,
    "blogPostId" text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: campaign_comment_reactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_comment_reactions (
    id text NOT NULL,
    "commentId" text NOT NULL,
    "userId" text NOT NULL,
    type character varying(16) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: campaign_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_comments (
    id text NOT NULL,
    "campaignId" text NOT NULL,
    "userId" text NOT NULL,
    "userName" text NOT NULL,
    "userAvatar" text,
    content text NOT NULL,
    "parentId" text,
    depth integer DEFAULT 0 NOT NULL,
    "isEdited" boolean DEFAULT false NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    status public."CampaignCommentStatus" DEFAULT 'APPROVED'::public."CampaignCommentStatus" NOT NULL,
    "replyCount" integer DEFAULT 0 NOT NULL,
    "editHistory" jsonb DEFAULT '[]'::jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: campaign_contents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_contents (
    id text NOT NULL,
    "campaignId" text NOT NULL,
    "lastSavedBy" text NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    sections jsonb DEFAULT '[]'::jsonb NOT NULL,
    "mediaGallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
    "customFields" jsonb DEFAULT '{}'::jsonb NOT NULL,
    "isDraft" boolean DEFAULT true NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    "versionHistory" jsonb DEFAULT '[]'::jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: campaign_followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_followers (
    id text NOT NULL,
    "campaignId" text NOT NULL,
    "userId" text,
    email text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: campaign_reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_reports (
    id text NOT NULL,
    "campaignId" text,
    "userId" text NOT NULL,
    reason public."CampaignReportReason" NOT NULL,
    description text NOT NULL,
    status public."ReportStatus" DEFAULT 'PENDING'::public."ReportStatus" NOT NULL,
    "resolvedAt" timestamp(3) without time zone,
    "resolvedBy" text,
    resolution text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imageUrls" text[] DEFAULT ARRAY[]::text[],
    "occurredAt" timestamp(3) without time zone,
    "targetType" public."ReportTargetType" DEFAULT 'CAMPAIGN'::public."ReportTargetType" NOT NULL,
    "targetId" text NOT NULL,
    "targetTitle" text,
    "targetHref" text
);


--
-- Name: campaign_updates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_updates (
    id text NOT NULL,
    "campaignId" text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "imageUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isPinned" boolean DEFAULT false NOT NULL,
    tags text[] DEFAULT ARRAY[]::text[],
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaigns (
    id text NOT NULL,
    "campaignCode" text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "longDescription" text,
    "videoUrl" text,
    "imageUrl" text,
    type public."CampaignType" DEFAULT 'REWARD'::public."CampaignType" NOT NULL,
    category text NOT NULL,
    tags text[] DEFAULT ARRAY[]::text[],
    "goalAmount" numeric(65,30) NOT NULL,
    "currentAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    status public."CampaignStatus" DEFAULT 'DRAFT'::public."CampaignStatus" NOT NULL,
    "startDate" timestamp(3) without time zone,
    "endDate" timestamp(3) without time zone,
    "creatorId" text NOT NULL,
    "projectId" text,
    "feeRate" double precision DEFAULT 0.08 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    images text[] DEFAULT ARRAY[]::text[],
    "closedAmount" numeric(65,30),
    "closedAt" timestamp(3) without time zone,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "fundingModel" public."FundingModel" DEFAULT 'ALL_OR_NOTHING'::public."FundingModel" NOT NULL,
    "fulfillmentConfirmedAt" timestamp(3) without time zone
);


--
-- Name: chat_reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chat_reports (
    id text NOT NULL,
    "conversationId" text NOT NULL,
    "messageId" text,
    "reporterId" text NOT NULL,
    reason character varying(32) NOT NULL,
    description text NOT NULL,
    "imageUrls" text[] DEFAULT ARRAY[]::text[],
    "occurredAt" timestamp(3) without time zone,
    status character varying(32) DEFAULT 'pending'::character varying NOT NULL,
    "reviewedAt" timestamp(3) without time zone,
    "reviewedBy" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: checkout_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.checkout_sessions (
    id text NOT NULL,
    "userId" text,
    "campaignId" text NOT NULL,
    "rewardId" text,
    payload jsonb NOT NULL,
    "returnPath" text NOT NULL,
    status public."CheckoutSessionStatus" DEFAULT 'ACTIVE'::public."CheckoutSessionStatus" NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: conversations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conversations (
    id text NOT NULL,
    "conversationKey" text NOT NULL,
    type character varying(32) DEFAULT 'direct'::character varying NOT NULL,
    "participantIds" text[],
    participants jsonb DEFAULT '[]'::jsonb NOT NULL,
    "campaignData" jsonb,
    "lastMessage" jsonb,
    "unreadCount" jsonb DEFAULT '{}'::jsonb NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "isReported" boolean DEFAULT false NOT NULL,
    "blockedBy" text[] DEFAULT ARRAY[]::text[],
    "hiddenBy" text[] DEFAULT ARRAY[]::text[],
    "typingBy" jsonb DEFAULT '{}'::jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: daily_tip_invoices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.daily_tip_invoices (
    id text NOT NULL,
    "invoiceDate" timestamp(3) without time zone NOT NULL,
    "totalTip" numeric(65,30) NOT NULL,
    "totalVat" numeric(65,30) NOT NULL,
    status text DEFAULT 'PENDING'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: donation_certificates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.donation_certificates (
    id text NOT NULL,
    code text NOT NULL,
    "pledgeId" text NOT NULL,
    "campaignId" text,
    "creatorId" text,
    "backerUserId" text,
    "guestEmail" text,
    "displayName" text NOT NULL,
    amount numeric(65,30) NOT NULL,
    "flowType" public."MoneyFlowType" NOT NULL,
    "documentKind" public."TaxDocumentKind" NOT NULL,
    status public."CertificateStatus" DEFAULT 'ISSUED'::public."CertificateStatus" NOT NULL,
    "issuedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "emailSentAt" timestamp(3) without time zone,
    "claimedAt" timestamp(3) without time zone,
    "claimedByUserId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: kyc_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.kyc_info (
    id text NOT NULL,
    "userId" text NOT NULL,
    "fullName" text NOT NULL,
    "idCardNumber" text NOT NULL,
    "idCardType" public."IDCardType" NOT NULL,
    "idCardFrontImage" text,
    "idCardBackImage" text,
    "idCardIssueDate" timestamp(3) without time zone,
    "idCardIssuePlace" text,
    "dateOfBirth" timestamp(3) without time zone,
    "placeOfBirth" text,
    nationality text DEFAULT 'VN'::text NOT NULL,
    "permanentAddress" text,
    "currentAddress" text,
    occupation text,
    "monthlyIncome" text,
    "verificationStatus" public."KYCStatus" DEFAULT 'PENDING'::public."KYCStatus" NOT NULL,
    "verifiedAt" timestamp(3) without time zone,
    "verifiedBy" text,
    "rejectedReason" text,
    "riskLevel" public."RiskLevel" DEFAULT 'LOW'::public."RiskLevel" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "selfieImage" text,
    "consentAt" timestamp(3) without time zone,
    "ekycMeta" jsonb
);


--
-- Name: message_reactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.message_reactions (
    id text NOT NULL,
    "messageId" text NOT NULL,
    emoji character varying(16) NOT NULL,
    "userIds" text[] DEFAULT ARRAY[]::text[]
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id text NOT NULL,
    "conversationId" text NOT NULL,
    "senderId" text NOT NULL,
    "senderName" text NOT NULL,
    "senderAvatar" text,
    text text NOT NULL,
    type character varying(32) DEFAULT 'text'::character varying NOT NULL,
    attachments jsonb DEFAULT '[]'::jsonb NOT NULL,
    "readBy" text[] DEFAULT ARRAY[]::text[],
    "isDeleted" boolean DEFAULT false NOT NULL,
    sensitive boolean DEFAULT false NOT NULL,
    "revealedBy" text[] DEFAULT ARRAY[]::text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id text NOT NULL,
    "userId" text NOT NULL,
    type character varying(64) NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    payload jsonb DEFAULT '{}'::jsonb NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "readAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    id text NOT NULL,
    "userId" text NOT NULL,
    "tokenHash" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "usedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: payment_methods; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_methods (
    id text NOT NULL,
    "userId" text NOT NULL,
    provider text NOT NULL,
    "methodType" public."PaymentMethodType" NOT NULL,
    label text NOT NULL,
    brand text,
    last4 text,
    "providerMethodRef" text,
    status public."PaymentMethodStatus" DEFAULT 'ACTIVE'::public."PaymentMethodStatus" NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: platform_invoices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.platform_invoices (
    id text NOT NULL,
    "invoiceNumber" text NOT NULL,
    "campaignId" text NOT NULL,
    "creatorId" text NOT NULL,
    amount numeric(65,30) NOT NULL,
    "vatAmount" numeric(65,30) NOT NULL,
    "totalAmount" numeric(65,30) NOT NULL,
    status public."InvoiceStatus" DEFAULT 'PENDING'::public."InvoiceStatus" NOT NULL,
    "dueDate" timestamp(3) without time zone NOT NULL,
    "paidAt" timestamp(3) without time zone,
    "paymentMethod" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: platform_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.platform_settings (
    key text NOT NULL,
    value text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: pledges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pledges (
    id text NOT NULL,
    "campaignId" text,
    "userId" text,
    "displayName" text NOT NULL,
    "isAnonymous" boolean DEFAULT false NOT NULL,
    email text,
    "phoneNumber" text,
    amount numeric(65,30) NOT NULL,
    "tipAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    "platformFee" numeric(65,30) DEFAULT 0 NOT NULL,
    "vatAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    "totalAmount" numeric(65,30) NOT NULL,
    "paymentProvider" text NOT NULL,
    "transactionId" text NOT NULL,
    "ipAddress" text,
    "deviceInfo" jsonb,
    status public."PledgeStatus" DEFAULT 'PENDING'::public."PledgeStatus" NOT NULL,
    "refundStatus" public."RefundStatus" DEFAULT 'NO_REFUND'::public."RefundStatus" NOT NULL,
    "refundedAt" timestamp(3) without time zone,
    "invoiceGroupDate" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "rewardId" text,
    "shippingAddress" text,
    "payosOrderCode" text,
    "webhookProcessedAt" timestamp(3) without time zone,
    "receivedAt" timestamp(3) without time zone,
    "isCashOnDelivery" boolean DEFAULT false NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "stockReserved" boolean DEFAULT false NOT NULL,
    "fulfillmentType" public."RewardFulfillmentType",
    "fulfillmentStatus" public."FulfillmentStatus" DEFAULT 'NOT_APPLICABLE'::public."FulfillmentStatus" NOT NULL,
    "shippingMethod" text,
    "shippingFee" numeric(65,30) DEFAULT 0 NOT NULL,
    "shippingProvider" text,
    "trackingNumber" text,
    "deliveryFailureReason" text,
    "cancellationReason" text,
    "returnReason" text,
    "accountingReversedAt" timestamp(3) without time zone,
    "depositAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    "chargeAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    "orderTotalAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    "remainingAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    "paidAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    "accountingAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    "refundAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    "cancellationFeeAmount" numeric(65,30) DEFAULT 0 NOT NULL,
    "handedToCarrierAt" timestamp(3) without time zone,
    CONSTRAINT pledges_amounts_nonnegative_check CHECK ((("depositAmount" >= (0)::numeric) AND ("chargeAmount" >= (0)::numeric) AND ("orderTotalAmount" >= (0)::numeric) AND ("remainingAmount" >= (0)::numeric) AND ("paidAmount" >= (0)::numeric) AND ("accountingAmount" >= (0)::numeric) AND ("refundAmount" >= (0)::numeric) AND ("cancellationFeeAmount" >= (0)::numeric)))
);


--
-- Name: product_reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_reviews (
    id text NOT NULL,
    "rewardId" text NOT NULL,
    "pledgeId" text NOT NULL,
    "userId" text NOT NULL,
    rating integer NOT NULL,
    comment text NOT NULL,
    "mediaUrls" text[] DEFAULT ARRAY[]::text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: profile_customization_versions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profile_customization_versions (
    id text NOT NULL,
    "customizationId" text NOT NULL,
    version integer NOT NULL,
    action character varying(24) NOT NULL,
    config jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: profile_customizations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profile_customizations (
    id text NOT NULL,
    "userId" text NOT NULL,
    "draftConfig" jsonb NOT NULL,
    "publishedConfig" jsonb NOT NULL,
    "draftVersion" integer DEFAULT 1 NOT NULL,
    "publishedVersion" integer DEFAULT 1 NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: project_blog_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_blog_links (
    id text NOT NULL,
    "projectId" text NOT NULL,
    "blogPostId" text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: project_reward_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_reward_links (
    id text NOT NULL,
    "projectId" text NOT NULL,
    "rewardId" text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id text NOT NULL,
    "creatorId" text NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255),
    description text,
    "coverImage" character varying(512),
    "richDescription" jsonb,
    "heroBackgroundType" character varying(16) DEFAULT 'image'::character varying NOT NULL,
    "heroBackgroundConfig" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isLocked" boolean DEFAULT false NOT NULL
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    id text NOT NULL,
    "userId" text NOT NULL,
    "campaignId" text,
    rating integer NOT NULL,
    comment text NOT NULL,
    "imageUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: reward_digital_assets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reward_digital_assets (
    id text NOT NULL,
    "rewardId" text NOT NULL,
    "campaignId" text,
    "pledgeId" text,
    "assetType" public."RewardFulfillmentType" NOT NULL,
    "encryptedValue" text,
    "assetUrl" text,
    "deliveryEmail" text,
    status public."DigitalAssetStatus" DEFAULT 'AVAILABLE'::public."DigitalAssetStatus" NOT NULL,
    "deliveredAt" timestamp(3) without time zone,
    "claimedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: rewards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rewards (
    id text NOT NULL,
    "campaignId" text,
    "projectId" text,
    title text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deliveryDate" timestamp(3) without time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "isIncludedInProject" boolean DEFAULT true NOT NULL,
    "maxQuantity" integer,
    "minAmount" numeric(65,30) NOT NULL,
    "maxAmount" numeric(65,30),
    stock integer,
    "productImages" text[] DEFAULT ARRAY[]::text[],
    "productVideo" text,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    availability public."RewardAvailability" DEFAULT 'AVAILABLE'::public."RewardAvailability" NOT NULL,
    "fulfillmentType" public."RewardFulfillmentType" DEFAULT 'PHYSICAL'::public."RewardFulfillmentType" NOT NULL,
    "isPreorder" boolean DEFAULT false NOT NULL,
    "onlineDepositPercent" integer DEFAULT 30 NOT NULL,
    "codDepositPercent" integer DEFAULT 50 NOT NULL,
    CONSTRAINT "rewards_codDepositPercent_check" CHECK ((("codDepositPercent" >= 1) AND ("codDepositPercent" <= 99))),
    CONSTRAINT "rewards_onlineDepositPercent_check" CHECK ((("onlineDepositPercent" >= 1) AND ("onlineDepositPercent" <= 99)))
);


--
-- Name: so_ledgers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.so_ledgers (
    id text NOT NULL,
    rev integer DEFAULT 0 NOT NULL,
    state jsonb NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: transaction_limits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transaction_limits (
    id text NOT NULL,
    "userId" text,
    "kycStatus" public."KYCStatus",
    "maxPerTransaction" numeric(65,30) NOT NULL,
    "maxPerDay" numeric(65,30) NOT NULL,
    "maxPerMonth" numeric(65,30) NOT NULL,
    "maxTransactionsPerDay" integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: user_badges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_badges (
    id text NOT NULL,
    user_id text NOT NULL,
    badge_id text NOT NULL,
    assigned_by text NOT NULL,
    reason text,
    note text,
    assigned_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at timestamp(3) without time zone,
    revoked_at timestamp(3) without time zone,
    revoked_by text,
    revoke_reason text,
    is_visible boolean DEFAULT true NOT NULL
);


--
-- Name: user_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_metadata (
    id text NOT NULL,
    "userId" text NOT NULL,
    preferences jsonb DEFAULT '{}'::jsonb NOT NULL,
    onboarding jsonb DEFAULT '{}'::jsonb NOT NULL,
    stats jsonb DEFAULT '{}'::jsonb NOT NULL,
    tags text[] DEFAULT ARRAY[]::text[],
    "customData" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: user_notes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_notes (
    id text NOT NULL,
    "userId" text NOT NULL,
    "targetUserId" text NOT NULL,
    note text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    password text,
    name text NOT NULL,
    "displayName" text,
    avatar text,
    phone text,
    role public."UserRole" DEFAULT 'BACKER'::public."UserRole" NOT NULL,
    "isOrganization" boolean DEFAULT false NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL,
    bio text,
    "idCard" text,
    "businessLicense" text,
    "bankAccount" text,
    "bankName" text,
    "approvedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    image text,
    location text,
    website text,
    "coverImage" text,
    "shippingAddress" text,
    "socialLinks" jsonb,
    status public."UserStatus" DEFAULT 'NORMAL'::public."UserStatus" NOT NULL,
    "privacySettings" jsonb,
    "notificationSettings" jsonb
);


--
-- Data for Name: _blog_postsTorewards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."_blog_postsTorewards" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d26648c9-cf91-453f-bde2-e81b2fe85fad	3b3c7058e0fbcdb65b2f4204fe487fab4323c5b256fdc91a76ba9861140d2ad3	2026-10-12 16:09:18.475201+07	0001_init_full_schema	\N	\N	2026-10-12 16:09:18.136539+07	1
f2d77dd3-6b72-4afb-96eb-318b7217fa43	277a6d9efd5c2eb17e1289a3920f8fa90707724d2566bde5e68735ed1a09458b	2026-10-12 16:09:18.670051+07	20260904184500_kyc_ekyc_meta	\N	\N	2026-10-12 16:09:18.667627+07	1
0358fa37-15e2-400b-ba3c-ad8905dbff01	0c743233d28e7faad77c34fd47f3f45d306aae3f8dc939f5fa950df8a277d19e	2026-10-12 16:09:18.496277+07	0002_product_reviews_and_receipt	\N	\N	2026-10-12 16:09:18.476584+07	1
739a84ec-d96e-497e-bab8-f563fbd8c011	16e7a21d2a4cd1e2e66fe5e2f7fe288c6f535d65835de48b14d238d5e406ad1e	2026-10-12 16:09:18.500258+07	0003_profile_privacy_notification_settings	\N	\N	2026-10-12 16:09:18.497524+07	1
8b7735b7-47ed-47b8-81b3-87faad8195f9	347cde62b143e5ee0cbae185d94ad1186bdf710acbedee19296813f173a03e5a	2026-10-12 16:09:18.512876+07	20260821114500_add_assistant_telemetry_events	\N	\N	2026-10-12 16:09:18.50154+07	1
3f666f8e-5158-4bd6-a6af-c53747981396	a8ce1db426bf2f290bde27cdeb4e36dc530f6873282c575a49e45c8c28273901	2026-10-12 16:09:18.700875+07	20260908120000_campaign_featured_funding_model	\N	\N	2026-10-12 16:09:18.671083+07	1
9b3e4336-8ef8-4363-b3d0-7e8311761e5c	680671f4e1989b50a212c5a00f080ddccf109e63c06bac9dc0176de29f83afc2	2026-10-12 16:09:18.546021+07	20260822150000_checkout_multi_method	\N	\N	2026-10-12 16:09:18.514592+07	1
6d603e05-c306-4d89-a32c-2e3152c26103	d1a4af7c7426d2f9f1ab14153fe585f36ad01cf8770b7845b0857d1c2fad93ca	2026-10-12 16:09:18.561374+07	20260822161000_password_reset_tokens	\N	\N	2026-10-12 16:09:18.547417+07	1
6fcd7710-e365-4c77-999e-2656464502d2	da6ce318973f90977e8cc1d7f0b0b179d34f13adad780b056d910b0d998b1233	2026-10-12 16:09:18.585954+07	20260824190000_profile_customizations	\N	\N	2026-10-12 16:09:18.562751+07	1
55a5d9f5-8add-4868-9168-e6c564438470	2bb58e6de057bcd307cdbabe5375e5697b964b7cd6bf4056491d76342e187eab	2026-10-12 16:09:18.725722+07	20260908120000_donation_certificates	\N	\N	2026-10-12 16:09:18.702374+07	1
2ce29c14-5700-4602-b36b-ce4d591f087a	7cfa97bbcfadd62d3698dc4006e5b2454cfe70974ecb2e58595a3ce7909e22f5	2026-10-12 16:09:18.615155+07	20260824200000_order_fulfillment_accounting	\N	\N	2026-10-12 16:09:18.587494+07	1
a34f9b0a-efd9-4a3a-b34c-aaefcdbe4210	5d8a7a6815035ee0d934c9153eae76adc1e772393e3ba4916267e4da5b7c0f30	2026-10-12 16:09:18.619542+07	20260824210000_product_preorder	\N	\N	2026-10-12 16:09:18.616557+07	1
2114421b-c1fc-49c8-9521-fb35c8b97381	a45b546dc43b2843612fea9b5d6c3ea164329ea3363ed7b43fa6f06b4f186e28	2026-10-12 16:09:18.632926+07	20260824220000_preorder_deposit_policy	\N	\N	2026-10-12 16:09:18.62083+07	1
971267d7-e2e2-4289-92c8-f47cb6199dd6	85ba90de4cfed9e9fdd376ba38b1f7104b5e69974da02039221027f5b7594654	2026-10-12 16:09:18.72931+07	20260911083000_hybrid_fulfillment_sla	\N	\N	2026-10-12 16:09:18.726619+07	1
50566139-ba9c-4949-9754-e4c8976ee7d0	075e9cbcb3f39a04255d712c1d9e30461a75e40b548b59886c505a7a8e3fcd93	2026-10-12 16:09:18.637392+07	20260904100000_admin_moderation	\N	\N	2026-10-12 16:09:18.633917+07	1
6d0bae4a-b3b4-4c19-8d33-b0756eaa5a05	0abe7b0927dba2b3cb8803ad9596da2a2612390696bda3f18e313b8b2b977102	2026-10-12 16:09:18.640749+07	20260904120000_report_evidence	\N	\N	2026-10-12 16:09:18.638353+07	1
1d85921c-6dd3-425c-a6ed-bdde3617ce00	67046d2cf70f58bdda004f844a94f400e4e2bab39371dc2c71259771bcfb5b58	2026-10-12 16:09:18.666611+07	20260904130000_content_reports	\N	\N	2026-10-12 16:09:18.641968+07	1
7b13f355-6b62-4415-a8d9-c8e95b3a0876	417d758f8282d8c22f9bf3c300baf76b00917152751935cb28ad5f17a72a1eba	2026-10-12 16:09:18.997847+07	20260911134110_migrate_mongo_to_postgres	\N	\N	2026-10-12 16:09:18.73054+07	1
9434d4ff-0724-4445-a7d3-592c0ea182f9	18b56b28bb73768ddeb33810d674f211f8e507579944f51c24515f6f2e48b242	2026-10-12 16:09:19.009401+07	20260923040000_so_ledger	\N	\N	2026-10-12 16:09:18.999087+07	1
748a46b9-1f55-4eb7-863d-37632e398ac0	1c03f705b3c93c505d7f36d2029eab4667b4ea496852cb03483cddc24aaa09ef	2026-08-20 10:08:20.414099+07	0001_init_full_schema		\N	2026-08-20 10:08:20.414099+07	0
5b20aca0-6d35-4b2f-b884-f332cc327e4b	6b52536767683d59df212d9f9de168c8deeefc034825996a6875fda3c45a3326	2026-09-04 18:59:18.885671+07	20260904184500_kyc_ekyc_meta	\N	\N	2026-09-04 18:59:17.762572+07	1
0bbf3472-c0cb-44cf-a075-bddd2bc01e47	7f80e4845fe055ee52225379a80eddfbad3404ca1ac715b3afd5501351d42645	2026-08-21 19:20:10.832145+07	20260821114500_add_assistant_telemetry_events	\N	\N	2026-08-21 19:20:09.453045+07	1
ac6d8c07-d650-4508-b3ed-b56d59b6d2ba	62cd96788b3e3462d4aa72b279b52b9695ca1d7cc69952f9fa81bd05334223b7	2026-08-21 19:50:08.926163+07	0002_product_reviews_and_receipt	\N	\N	2026-08-21 19:50:07.732453+07	1
32787a58-8e77-4176-a4b4-a578bc5655ab	ec1e89707562ce81ae272b43bb44b57153c6e0c24666427a7b4c957d2296301d	2026-08-22 03:02:02.753621+07	0003_profile_privacy_notification_settings	\N	\N	2026-08-22 03:02:01.662011+07	1
423b272c-a9dc-4884-85c6-0073e965cb07	93b5c3bbdc25dae17381bc607e3bf63b3d5a0d23525954abf34dffbb22757caa	2026-09-08 18:07:27.327966+07	20260908120000_campaign_featured_funding_model	\N	\N	2026-09-08 18:07:26.093937+07	1
f34e4878-86d7-49f0-8ef8-d7fcb3873b7f	61eca2a16d8423820ab44d0acc3c941360da283ad6dc9499020c7d1bab2a8473	2026-08-22 16:55:15.787682+07	20260822150000_checkout_multi_method	\N	\N	2026-08-22 16:55:14.611619+07	1
0d53c364-2e80-4841-9006-06985b894ebd	fdc242a35216f0a13ec8c57c6f4d9ef401e940387f96b1a58a371f16a847c38e	2026-08-22 17:36:17.411087+07	20260822161000_password_reset_tokens	\N	\N	2026-08-22 17:36:16.243759+07	1
f559350d-5950-4a08-9b61-004fca5dc6c1	73ab7da6b7b6ce98ae6faccccc2db76caa51273c6ab5d44ef29da55bf43fb468	2026-09-11 14:13:17.580555+07	20260911134110_migrate_mongo_to_postgres	\N	\N	2026-09-11 14:13:15.961451+07	1
bf54f62c-738e-4061-9633-8e1333229c2b	1187915c715c44cc933674af6b417d35bac9a82887416c0029d9628168d3ee41	2026-08-24 00:25:10.746285+07	20260824190000_profile_customizations	\N	\N	2026-08-24 00:25:09.44684+07	1
861791a1-d23c-4b3e-ab46-2e54e743508b	86914e508bc2f0bf08e3449297dadd3fcf3cc3b3c483cb43dc3a195f0a703c53	2026-09-08 18:09:29.696714+07	20260908120000_donation_certificates	\N	\N	2026-09-08 18:09:28.53402+07	1
1458c41b-6403-4bc6-a083-23938cf357ab	685e6c92549f664d7b7795845c1456de230ffeb82d8c63dbf2a1a8131114b90c	2026-08-24 12:30:01.682954+07	20260824200000_order_fulfillment_accounting	\N	\N	2026-08-24 12:30:00.390995+07	1
6f51d5f0-253f-4cff-87bc-b9d45c58bf88	270d821bd228a84cb7522e6abb137e19311dedd8a6743f657987ac24872cc84c	2026-08-24 13:25:21.310426+07	20260824210000_product_preorder	\N	\N	2026-08-24 13:25:20.09161+07	1
dfd31a4c-c771-49ea-8d4b-884ed9b47f6a	5547aaf2589a3c84161b6f0db87720733cb4b713f7f6852c9374ce273494dd4d	2026-08-24 14:40:14.171032+07	20260824220000_preorder_deposit_policy	\N	\N	2026-08-24 14:40:12.968983+07	1
7057af49-9da1-4c33-aba6-b1b8ea4180e8	261ce1e5c969b4efea930bba2a69daf305c9c3636f222bc43c21f2f6b2f1ad94	\N	20260911134110_migrate_mongo_to_postgres	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20260911134110_migrate_mongo_to_postgres\n\nDatabase error code: 42601\n\nDatabase error:\nERROR: syntax error at or near "﻿"\n\nPosition:\n[1m  0[0m\n[1m  1[1;31m ﻿-- CreateEnum[0m\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E42601), message: "syntax error at or near \\"\\u{feff}\\"", detail: None, hint: None, position: Some(Original(1)), where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("scan.l"), line: Some(1244), routine: Some("scanner_yyerror") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20260911134110_migrate_mongo_to_postgres"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name="20260911134110_migrate_mongo_to_postgres"\n             at schema-engine/core/src/commands/apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:226	2026-09-11 14:13:09.448861+07	2026-09-11 13:45:01.602672+07	0
da261d81-2f2f-41f1-8429-d75b5f3b57bf	82094f7b97b5c2f628da214ca8c8675998c836fdc80252ebeed5f9d10f21bee3	2026-09-04 17:29:02.107668+07	20260904100000_admin_moderation	\N	\N	2026-09-04 17:29:00.95491+07	1
2b194d01-2426-4f67-b7b6-3cbdd4630b8b	00303d93c25758333784c3a2a39ed6c1612d61775731158298a73ab34f456c6d	2026-09-04 18:29:15.961422+07	20260904120000_report_evidence	\N	\N	2026-09-04 18:29:14.793813+07	1
56a30736-98ac-4075-9f5f-a02472cf314a	73aa7958dc9896afa0f164ec34f02b946c55bd2a4911b71670a586d53c9ecf2a	2026-09-04 18:35:26.86944+07	20260904130000_content_reports	\N	\N	2026-09-04 18:35:25.65565+07	1
d9666b8d-0aa9-4414-ae2f-0e4247562bd4	6545642391d69bc1de28188384ab0d5cf7d643be3756d0b2fff8f3ff7fb58975	2026-09-11 14:28:17.820288+07	20260911083000_hybrid_fulfillment_sla	\N	\N	2026-09-11 14:28:16.761108+07	1
8191120a-a521-4fa2-83b9-d6235c1492ae	ad6d437fc18623dd94afabef26f25ed109c0bdc87512af6d9d2120e8df2f13be	2026-10-08 16:27:26.791202+07	20261008093000_platform_feedback	\N	\N	2026-10-08 16:27:24.933658+07	1
9b14df1a-3797-45a8-89de-fc925dd50455	a43dd8d6211e819acde00cd31e60563bd6bbe737218ef4083a39632cdbff7164	2026-09-23 03:52:57.883064+07	20260923040000_so_ledger	\N	\N	2026-09-23 03:52:56.692406+07	1
3cf8b1a9-a390-44c7-af80-eeeffcd85a95	5b02210ac3599ab3cc48eacad7bad766587576a5cf6d43b475b6ab949b810d17	2026-10-07 01:24:14.765386+07	20261007013000_read_path_indexes	\N	\N	2026-10-07 01:24:13.58918+07	1
f7ce218e-e08c-485d-9ea7-fa499fbefadb	431526fb8e85387b1e36e880c9e205fb74aec88a40f62853995dec81f357b064	2026-10-07 02:03:35.204022+07	20261007020000_memberships_and_credentials	\N	\N	2026-10-07 02:03:33.98557+07	1
\.


--
-- Data for Name: activity_logs_v2; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.activity_logs_v2 (id, "userId", action, "entityType", "entityId", details, metadata, "createdAt") FROM stdin;
\.


--
-- Data for Name: analytics_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.analytics_events (id, "eventName", "userId", "campaignId", "sessionId", path, payload, device, "createdAt") FROM stdin;
cmtwmikyx00004mrwdclcp3to	PAGE_VIEW	\N	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/	\N	\N	2026-09-11 07:17:14.022
cmtwmiqex0000crr3m9ucdzbf	PAGE_LEAVE	\N	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/	{"durationMs": 8056}	\N	2026-09-11 07:17:21.081
cmtwmiqg6000014mqt3d1a19s	PAGE_VIEW	\N	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog	\N	\N	2026-09-11 07:17:21.127
cmtwmituj0001crr3ex8y8737	PAGE_LEAVE	\N	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog	{"durationMs": 4444}	\N	2026-09-11 07:17:25.532
cmtwmitvy000114mqyncukplq	PAGE_VIEW	\N	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	\N	\N	2026-09-11 07:17:25.582
cmtwmiyvv00005n2mj09o6sjg	PAGE_LEAVE	\N	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog	{"durationMs": 2616}	\N	2026-09-11 07:17:32.06
cmtwmiywa0000xzm3jif41dzz	PAGE_VIEW	\N	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog/huong-dan-nhan-san-pham-so-1787564123531-0e9kj	\N	\N	2026-09-11 07:17:32.074
cmtwmiz9p0000e6jc1u7mi3ad	PAGE_VIEW	\N	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/auth/login	\N	\N	2026-09-11 07:17:32.558
cmtwmiz9r0001xzm383z545tw	PAGE_LEAVE	\N	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog/huong-dan-nhan-san-pham-so-1787564123531-0e9kj	{"durationMs": 526}	\N	2026-09-11 07:17:32.559
cmtwmiz9s0001e6jcq06e8cvr	PAGE_VIEW	\N	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog	\N	\N	2026-09-11 07:17:32.234
cmtwmj3wf0002e6jcuh9f4vk2	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/auth/login	{"durationMs": 5958}	\N	2026-09-11 07:17:38.559
cmtwmj3xw0002xzm3zwjmxw6j	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/dashboard	\N	\N	2026-09-11 07:17:38.612
cmtwmj45k0003xzm3ubgf8w6b	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/profile/f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	\N	2026-09-11 07:17:38.888
cmtwmj45q0003e6jcbyli9qat	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/dashboard	{"durationMs": 350}	\N	2026-09-11 07:17:38.894
cmtwmj58p0004e6jcov713nad	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/profile/f88cb919-d8c3-412f-8996-0f74ee3ea443	{"durationMs": 1407}	\N	2026-09-11 07:17:40.297
cmtwmj58w00015n2mjdqc5n4y	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/chat	\N	\N	2026-09-11 07:17:40.305
cmtwmjevl00025n2mrcqj8jcw	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/chat	{"durationMs": 12497}	\N	2026-09-11 07:17:52.784
cmtwmjew20005e6jcw0xply47	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog	\N	\N	2026-09-11 07:17:52.8
cmtwmjgbw0006e6jc0g81at22	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/users/search	\N	\N	2026-09-11 07:17:54.668
cmtwmjgbz00035n2m282lo8qm	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog	{"durationMs": 1891}	\N	2026-09-11 07:17:54.672
cmtwmjhe00007e6jcnejiipa7	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/projects	\N	\N	2026-09-11 07:17:56.04
cmtwmjhe30004xzm3fj9eckit	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/users/search	{"durationMs": 1365}	\N	2026-09-11 07:17:56.042
cmtwmji8o0005xzm3xyua2pqy	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/projects	{"durationMs": 1125}	\N	2026-09-11 07:17:57.145
cmtwmji8t00045n2mgocvfku1	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/gioi-thieu	\N	\N	2026-09-11 07:17:57.15
cmtwmjkbk0006xzm3iyo4tvkh	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/projects	\N	\N	2026-09-11 07:17:59.841
cmtwmjkbs0008e6jc6d36yp2l	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/gioi-thieu	{"durationMs": 2678}	\N	2026-09-11 07:17:59.849
cmtwmjli10009e6jcqvv2586q	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog	\N	\N	2026-09-11 07:18:01.37
cmtwmjll7000ae6jcczxada2q	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/projects	{"durationMs": 1529}	\N	2026-09-11 07:18:01.483
cmtwmjmqx000be6jcozj7dka3	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/users/search	\N	\N	2026-09-11 07:18:02.986
cmtwmjmqy0007xzm3h5v6kkyr	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog	{"durationMs": 1609}	\N	2026-09-11 07:18:02.987
cmtwmjns60008xzm3oigoqfrk	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/projects	\N	\N	2026-09-11 07:18:04.326
cmtwmjnse00055n2mzhysnm30	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/users/search	{"durationMs": 1345}	\N	2026-09-11 07:18:04.335
cmtwmjoe1000ce6jc5r3h5l93	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/projects	{"durationMs": 788}	\N	2026-09-11 07:18:05.114
cmtwmjoen000de6jcvumpie0a	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog	\N	\N	2026-09-11 07:18:05.135
cmtwmjst6000ee6jc4f5rqsd6	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/blog	{"durationMs": 5739}	\N	2026-09-11 07:18:10.843
cmtwmjst900065n2mi5kidkjh	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/projects	\N	\N	2026-09-11 07:18:10.846
cmtwmka23000fe6jcqwybg1xk	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	2a4db651-9efd-43e4-9b5a-e1941b651f7d	/projects	{"durationMs": 12355}	\N	2026-09-11 07:18:23.254
cmu0rjcvl0000aq8j6lnxmvp6	PAGE_LEAVE	\N	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/	{"durationMs": 3174}	\N	2026-09-14 04:48:52.977
cmu0rjcw40000tjttn3ae7vng	PAGE_VIEW	\N	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/auth/login	\N	\N	2026-09-14 04:48:52.996
cmu0rjnf60001aq8jy0aejfft	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/auth/login	{"durationMs": 13592}	\N	2026-09-14 04:49:06.643
cmu0rjnfk0001tjtt8eh3zwz5	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/dashboard	\N	\N	2026-09-14 04:49:06.647
cmu0rjnsh0002tjttsti4hf4t	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-14 04:49:07.121
cmu0rjnsh0002aq8j1r5k6sxb	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/dashboard	{"durationMs": 556}	\N	2026-09-14 04:49:07.121
cmu0rjumq00001079mam48i50	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 8773}	\N	2026-09-14 04:49:15.987
cmu0rm3nb00011079p62yotuv	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/	\N	\N	2026-09-14 04:51:00.983
cmu0rm3nw0003tjttvkntc1a5	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1542}	\N	2026-09-14 04:51:01.001
cmv4o49js0006do34asd3164f	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	\N	\N	2026-10-12 03:03:57.016
cmv4o4gm30007do34owfc58p6	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 9153}	\N	2026-10-12 03:04:06.169
cmv4o4k8k0008do34qgrhi5t1	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	\N	\N	2026-10-12 03:04:10.869
cmu0rm7bu0004tjtttdbnukq8	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	\N	\N	2026-09-14 04:51:05.755
cmu0rmbcu0005tjtt5n92jdam	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"durationMs": 5217}	\N	2026-09-14 04:51:10.974
cmv4o49k40005qvexvzf0s8r5	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/cmphnhw8e0002so1uh16dwpvn/edit	{"durationMs": 24135}	\N	2026-10-12 03:03:57.026
cmv4o4glz0006qvexlsns2ucq	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns	\N	\N	2026-10-12 03:04:06.167
cmv4o4k8q0007qvexfssbf1mp	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns	{"durationMs": 4692}	\N	2026-10-12 03:04:10.874
cmv4o4syb0008qvexo817d7q6	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 11320}	\N	2026-10-12 03:04:22.163
cmu0rm7c4000210792f99v514	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/	{"durationMs": 4759}	\N	2026-09-14 04:51:05.765
cmu0rqyd70003aq8jmkcscfct	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"durationMs": 182149}	\N	2026-09-14 04:54:47.419
cmu0rqz9s000073l81t0xcykb	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/	\N	\N	2026-09-14 04:54:47.528
cmu0rr0ug000173l8j6pyigk3	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/campaigns/create	\N	\N	2026-09-14 04:54:50.633
cmu0rr1hc0000ev6lmnxv0cst	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/	{"durationMs": 3232}	\N	2026-09-14 04:54:50.712
cmu0rr6u30004aq8jdonl883v	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/campaigns/create	{"durationMs": 4678}	\N	2026-09-14 04:54:58.395
cmu0rr6u60001ev6lf4h48k78	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/	\N	\N	2026-09-14 04:54:58.398
cmu0rrgmh0005aq8jg6x3wn8b	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/	{"durationMs": 12643}	\N	2026-09-14 04:55:11.08
cmu0rrss80006aq8jn2or6hzn	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/	{"durationMs": 3043}	\N	2026-09-14 04:55:26.841
cmu0rrtu30002ev6lvssoltdj	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/purchases	\N	\N	2026-09-14 04:55:26.852
cmu0rryia0007aq8j1sgx2xbm	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/purchases	{"durationMs": 7408}	\N	2026-09-14 04:55:34.258
cmu0rryid0003ev6lb4l0pn0x	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/chung-tu/TT-UH-202609-49B9	\N	\N	2026-09-14 04:55:34.262
cmu0rtzq80004ev6lz4nl9jcc	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/chung-tu/TT-UH-202609-49B9	{"durationMs": 94882}	\N	2026-09-14 04:57:09.152
cmu0ru2c70005ev6lsr4jz94b	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/chung-tu/TT-UH-202609-49B9	{"durationMs": 1455}	\N	2026-09-14 04:57:12.535
cmu0rwkfs00001x62zq1eg425	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/chung-tu/TT-UH-202609-49B9	{"durationMs": 0}	\N	2026-09-14 04:59:09.304
cmu0rwo1800011x6224vwln1m	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	76fc1931-6237-465a-ac85-38fbe9590146	/chung-tu/TT-UH-202609-49B9	\N	\N	2026-09-14 04:59:13.965
cmu0rwo2r000081vxzeqvnjms	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/chung-tu/TT-UH-202609-49B9	{"durationMs": 109148}	\N	2026-09-14 04:59:14.017
cmu0rxouo0000xxdyjo4ynsdw	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	76fc1931-6237-465a-ac85-38fbe9590146	/chung-tu/TT-UH-202609-49B9	{"durationMs": 47720}	\N	2026-09-14 05:00:01.678
cmu0rymkj000181vxhwoqzjad	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	76fc1931-6237-465a-ac85-38fbe9590146	/chung-tu/TT-UH-202609-49B9	{"durationMs": 9563}	\N	2026-09-14 05:00:45.379
cmu0rymkm0001xxdyaxs14en9	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	76fc1931-6237-465a-ac85-38fbe9590146	/chung-tu/TT-UH-202609-49B9	{"durationMs": 0}	\N	2026-09-14 05:00:45.38
cmu0rymoq000281vxd93k02uy	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	76fc1931-6237-465a-ac85-38fbe9590146	/chung-tu/TT-UH-202609-49B9	\N	\N	2026-09-14 05:00:45.531
cmu0ryqri0000qwir8739drkt	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	76fc1931-6237-465a-ac85-38fbe9590146	/chung-tu/TT-UH-202609-49B9	{"durationMs": 5267}	\N	2026-09-14 05:00:50.815
cmu0ryv1w00021x627fd8b6bn	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	76fc1931-6237-465a-ac85-38fbe9590146	/chung-tu/TT-UH-202609-49B9	{"durationMs": 3103}	\N	2026-09-14 05:00:56.372
cmu0ryv2w00031x6215aofa9w	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	76fc1931-6237-465a-ac85-38fbe9590146	/chung-tu/TT-UH-202609-49B9	{"durationMs": 0}	\N	2026-09-14 05:00:56.409
cmu0ryv7400041x62h3x1sz5o	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/chung-tu/TT-UH-202609-49B9	\N	\N	2026-09-14 05:00:56.56
cmu0ryxlq00051x62xhi0t601	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/chung-tu/TT-UH-202609-49B9	{"durationMs": 3102}	\N	2026-09-14 05:00:59.678
cmu0s8d0t00061x62eizzspd6	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/chung-tu/TT-UH-202609-49B9	{"durationMs": 1}	\N	2026-09-14 05:08:19.564
cmu0s8vg9000012v4kzxt253u	PAGE_VIEW	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/	\N	\N	2026-09-14 05:08:43.445
cmu0s9ld90000x6aw65vnxqwi	PAGE_LEAVE	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/	{"durationMs": 32840}	\N	2026-09-14 05:09:17
cmu0s9lqn0001x6awmwlzksfr	PAGE_LEAVE	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/projects	{"durationMs": 812}	\N	2026-09-14 05:09:17.519
cmu0s9mmu0002x6aw4z38tm7u	PAGE_VIEW	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/projects	\N	\N	2026-09-14 05:09:18.679
cmu0s9mpv0000kflouozyryat	PAGE_VIEW	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/gioi-thieu	\N	\N	2026-09-14 05:09:18.782
cmu0s9mr10001kflo14aitdqy	PAGE_VIEW	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/gioi-thieu	\N	\N	2026-09-14 05:09:18.784
cmu0s9mrx0002kflo2wxindqi	PAGE_LEAVE	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/gioi-thieu	{"durationMs": 1000}	\N	2026-09-14 05:09:18.784
cmu0s9pvb0003kflo3ndum9qh	PAGE_VIEW	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/projects	\N	\N	2026-09-14 05:09:18.782
cmu0say4n0004kflod1f4k595	PAGE_LEAVE	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/projects	{"durationMs": 61421}	\N	2026-09-14 05:10:20.229
cmu0s8d0o0002xxdyxf0p5vb1	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9e01a4aa-0124-406c-9ffa-86cc5c4ba2c7	/chung-tu/TT-UH-202609-49B9	{"durationMs": 3457}	\N	2026-09-14 05:08:19.56
cmu0sglbf0005kflou889ppd6	PAGE_LEAVE	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/projects	{"durationMs": 2776}	\N	2026-09-14 05:14:41.856
cmu0sgu2d0006kflov3f4mo1a	PAGE_VIEW	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/auth/login	\N	\N	2026-09-14 05:14:54.902
cmu0sgu300007kflodhvtqj7s	PAGE_LEAVE	\N	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/projects	{"durationMs": 2139}	\N	2026-09-14 05:14:54.925
cmu0sgz3b0008kflo24ud2440	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/dashboard	\N	\N	2026-09-14 05:15:01.415
cmu0sgz3e0003x6awqznvect7	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/auth/login	{"durationMs": 6457}	\N	2026-09-14 05:15:01.418
cmu0sgzes0009kflo64o535q1	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-14 05:15:01.828
cmu0sgzet0004x6awl87sguv7	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/dashboard	{"durationMs": 456}	\N	2026-09-14 05:15:01.829
cmu0sh620000akfloaretfghy	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/	\N	\N	2026-09-14 05:15:10.441
cmu0shef2000bkflo3r8u6hri	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/campaigns/album-mam-sang-1787564107725-3c1kg	\N	\N	2026-09-14 05:15:21.277
cmv4o5nlo000431zuhll1hmnl	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 8452}	\N	2026-10-12 03:05:01.884
cmv50ovgo0000njbh1nwv9rcf	PAGE_VIEW	\N	\N	afedf251-3e28-49bb-8407-336900131dab	/	\N	\N	2026-10-12 08:55:53.69
cmv50qqhi0001njbhd5jm19fy	PAGE_VIEW	\N	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/	\N	\N	2026-10-12 08:57:20.791
cmv50r2ge0003njbhlxwm7z1o	PAGE_VIEW	\N	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/auth/login	\N	\N	2026-10-12 08:57:36.274
cmv50rh8a0006njbh7f1ga8i8	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/dashboard	{"durationMs": 9512}	\N	2026-10-12 08:57:55.45
cmu0sh6290005x6aw9d0koyof	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 8623}	\N	2026-09-14 05:15:10.449
cmu0sheeu0006x6awkyj2ggqe	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/	{"durationMs": 10811}	\N	2026-09-14 05:15:21.269
cmu0sidos000ckflouxfz0gkk	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 45717}	\N	2026-09-14 05:16:06.989
cmu0sidp60007x6awshb8qinz	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/dashboard	\N	\N	2026-09-14 05:16:07.002
cmu0sidy10008x6awu9wcgofo	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/dashboard	{"durationMs": 353}	\N	2026-09-14 05:16:07.322
cmu0sidye000dkflo0ailiajf	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-14 05:16:07.334
cmu0sii8d0009x6awkmhn4y4h	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 5519}	\N	2026-09-14 05:16:12.877
cmu0sii8o000ekflog5gqj3d3	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/purchases	\N	\N	2026-09-14 05:16:12.888
cmu0sikgi000fkfloze169f5h	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/chung-tu/TT-UH-202609-49B9	\N	\N	2026-09-14 05:16:15.761
cmu0sikgo000ax6awvq5bmm49	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/purchases	{"durationMs": 2895}	\N	2026-09-14 05:16:15.767
cmu0siqai000bx6aw17ontvt1	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/chung-tu/TT-UH-202609-49B9	{"durationMs": 7562}	\N	2026-09-14 05:16:23.322
cmu0sqgyb000gkflojbzoz28j	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/	\N	\N	2026-09-14 05:22:24.467
cmu0sqgyq00004714zhyagczf	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/chung-tu/TT-UH-202609-49B9	{"durationMs": 2138}	\N	2026-09-14 05:22:24.482
cmu0sqqzb000cx6awh8d95qnq	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/	{"durationMs": 12959}	\N	2026-09-14 05:22:37.464
cmu0sqr08000dx6aw3ljrqitc	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/gioi-thieu	\N	\N	2026-09-14 05:22:37.496
cmu0sqrs7000ex6awprqh8vh1	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/	\N	\N	2026-09-14 05:22:38.504
cmu0sqrsx000fx6awrl0vb540	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/gioi-thieu	{"durationMs": 1038}	\N	2026-09-14 05:22:38.529
cmu0srbir000gx6aw6on2zpqx	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/	{"durationMs": 25574}	\N	2026-09-14 05:23:04.083
cmu0tdddl0000oy930jiwd73r	PAGE_LEAVE	\N	\N	a1877734-b964-454d-8dde-c9b975ca0af4	/	{"durationMs": 3945}	\N	2026-09-14 05:40:12.922
cmu0tdded0000xbaxthte6qye	PAGE_VIEW	\N	\N	a1877734-b964-454d-8dde-c9b975ca0af4	/campaigns/album-mam-sang-1787564107725-3c1kg	\N	\N	2026-09-14 05:40:12.949
cmu0tdemw0001oy93urjq88dg	PAGE_LEAVE	\N	\N	a1877734-b964-454d-8dde-c9b975ca0af4	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 1670}	\N	2026-09-14 05:40:14.552
cmu0tdeni0000rco9gvrv38ll	PAGE_VIEW	\N	\N	a1877734-b964-454d-8dde-c9b975ca0af4	/projects	\N	\N	2026-09-14 05:40:14.574
cmu0tdpye0000hc354zzzgfj7	PAGE_LEAVE	\N	\N	a1877734-b964-454d-8dde-c9b975ca0af4	/projects	{"durationMs": 14301}	\N	2026-09-14 05:40:29.22
cmu0tdtga0000by65zezl507c	PAGE_LEAVE	\N	\N	a1877734-b964-454d-8dde-c9b975ca0af4	/	{"durationMs": 4891}	\N	2026-09-14 05:40:33.755
cmu0tld3s0000yhbmouihvc82	PAGE_VIEW	\N	\N	a1877734-b964-454d-8dde-c9b975ca0af4	/	\N	\N	2026-09-14 05:46:25.813
cmu0ypcir0000cjky4o77j9sv	PAGE_LEAVE	\N	\N	a1877734-b964-454d-8dde-c9b975ca0af4	/	{"durationMs": 1132}	\N	2026-09-14 08:09:29.761
cmu2qb84u0000252p88mmpgq2	PAGE_VIEW	\N	\N	a924d1c6-8ea2-495f-9f2f-8da7f6a83094	/	\N	\N	2026-09-15 13:50:06.319
cmu2qbaf2000014mzyzzty3tp	PAGE_VIEW	\N	\N	a924d1c6-8ea2-495f-9f2f-8da7f6a83094	/auth/login	\N	\N	2026-09-15 13:50:09.279
cmu2qbag9000014b7qmojuuv5	PAGE_LEAVE	\N	\N	a924d1c6-8ea2-495f-9f2f-8da7f6a83094	/	{"durationMs": 3028}	\N	2026-09-15 13:50:09.321
cmu2qbseo0000zresit7byfog	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a924d1c6-8ea2-495f-9f2f-8da7f6a83094	/dashboard	\N	\N	2026-09-15 13:50:32.592
cmu2qbst00001zresyshn3n08	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a924d1c6-8ea2-495f-9f2f-8da7f6a83094	/dashboard	{"durationMs": 563}	\N	2026-09-15 13:50:33.109
cmu2qbsvd0000735vd3ojojel	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a924d1c6-8ea2-495f-9f2f-8da7f6a83094	/auth/login	{"durationMs": 23294}	\N	2026-09-15 13:50:33.191
cmu2qbsw00001735vol0zvz3u	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a924d1c6-8ea2-495f-9f2f-8da7f6a83094	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 13:50:33.191
cmu2qcpry0002735v29dbittr	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a924d1c6-8ea2-495f-9f2f-8da7f6a83094	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 42726}	\N	2026-09-15 13:51:15.839
cmu2r783t0000vy2kgxw662pb	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91390084-6b2f-43f9-b173-d856959bb0d1	/	\N	\N	2026-09-15 14:14:59.234
cmu2r7c5v00004acz8cbksbr3	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91390084-6b2f-43f9-b173-d856959bb0d1	/	{"durationMs": 6530}	\N	2026-09-15 14:15:04.531
cmu2r7c600001vy2kz892hn62	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91390084-6b2f-43f9-b173-d856959bb0d1	/dashboard	\N	\N	2026-09-15 14:15:04.536
cmu2r7csx0002vy2koes7yd67	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91390084-6b2f-43f9-b173-d856959bb0d1	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 14:15:05.362
cmu2r7ct200014acz88wvn7bm	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91390084-6b2f-43f9-b173-d856959bb0d1	/dashboard	{"durationMs": 839}	\N	2026-09-15 14:15:05.366
cmu2r7oxq00006e7mi548ycf3	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91390084-6b2f-43f9-b173-d856959bb0d1	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 15668}	\N	2026-09-15 14:15:21.087
cmu2s6ykb0000kosh3f4lycio	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	74a96307-cece-4ae4-a72d-525c2862fc04	/	\N	\N	2026-09-15 14:42:46.52
cmu2s71wf0000ti8o5j7nohi6	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	74a96307-cece-4ae4-a72d-525c2862fc04	/	{"durationMs": 4345}	\N	2026-09-15 14:42:50.847
cmu2s73wv0001ti8odiuwfw57	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	74a96307-cece-4ae4-a72d-525c2862fc04	/	{"durationMs": 2191}	\N	2026-09-15 14:42:53.456
cmu2s73x4000034s1r6b4b9u1	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	74a96307-cece-4ae4-a72d-525c2862fc04	/dashboard	\N	\N	2026-09-15 14:42:53.464
cmu2s74oq0002ti8o5w7st4mw	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	74a96307-cece-4ae4-a72d-525c2862fc04	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 14:42:54.459
cmu2sac1x0003ti8oz7mmv4u1	PAGE_VIEW	\N	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/	\N	\N	2026-09-15 14:45:23.972
cmu2saoxi0004ti8o8p0wjraz	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 14:45:40.661
cmu2saq0d0005ti8otmzxxo3y	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/dashboard	\N	\N	2026-09-15 14:45:42.062
cmu2saqbe0006ti8offsrfahy	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 14:45:42.459
cmu2saqc90007ti8oykf03nlw	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/dashboard	{"durationMs": 402}	\N	2026-09-15 14:45:42.489
cmu2sau7t0008ti8o74vkaj5n	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 5021}	\N	2026-09-15 14:45:47.513
cmu2sau900009ti8okroofxqq	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 0}	\N	2026-09-15 14:45:47.556
cmv4olxkh0000t9mc0jt4jd9m	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 7048}	\N	2026-10-12 03:17:41.297
cmv50r2fz0002njbhyymjchr1	PAGE_LEAVE	\N	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/	{"durationMs": 16151}	\N	2026-10-12 08:57:36.253
cmu2s74pu0001koshu8b253hs	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	74a96307-cece-4ae4-a72d-525c2862fc04	/dashboard	{"durationMs": 978}	\N	2026-09-15 14:42:54.498
cmu2s7hwx0002koshv6sqf1jv	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	74a96307-cece-4ae4-a72d-525c2862fc04	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 17152}	\N	2026-09-15 14:43:11.598
cmu2sadx50003koshcsezzftc	PAGE_VIEW	\N	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/auth/login	\N	\N	2026-09-15 14:45:26.393
cmu2saolk0004koshsp7dqxdg	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/dashboard	\N	\N	2026-09-15 14:45:40.233
cmu2saoyt0005koshf9fk6c9e	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/dashboard	{"durationMs": 483}	\N	2026-09-15 14:45:40.709
cmu2saq0c0006koshlpho2sfj	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1395}	\N	2026-09-15 14:45:42.061
cmu2saugd0007kosh045lpj96	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/auth/login	\N	\N	2026-09-15 14:45:47.822
cmu2sb1wn0008koshg5gsszky	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 14:45:54.939
cmu2sb1wv0009kosh00p8cukv	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2563}	\N	2026-09-15 14:45:57.487
cmv4oyi4t0003yl0vq7n86yng	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 2815}	\N	2026-10-12 03:27:27.821
cmv50r9y80004njbh53z03msc	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/auth/login	{"durationMs": 9615}	\N	2026-10-12 08:57:46.016
cmu2sadwy000134s1tuj3pfk1	PAGE_LEAVE	\N	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/	{"durationMs": 2427}	\N	2026-09-15 14:45:26.387
cmu2saolb000234s13kp0olrh	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/auth/login	{"durationMs": 13763}	\N	2026-09-15 14:45:40.223
cmu2sazaw000334s19ptge5hh	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/auth/login	{"durationMs": 6295}	\N	2026-09-15 14:45:54.104
cmu2sazcx000434s178sm3tke	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/dashboard	\N	\N	2026-09-15 14:45:54.178
cmu2sb7dq000534s1mnvkukgo	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	68aa1b43-10b9-4e42-a5ea-90d597cec658	/dashboard	{"durationMs": 837}	\N	2026-09-15 14:45:54.931
cmu2ubstl000027rjpfctvswo	PAGE_VIEW	\N	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/auth/login	\N	\N	2026-09-15 15:42:31.59
cmu2ubtqi000127rjr7wrkqvc	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/auth/login	{"durationMs": 13325}	\N	2026-09-15 15:42:32.779
cmu2ubtr2000227rjlokzxabr	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/campaigns/create	\N	\N	2026-09-15 15:42:32.799
cmu2ubyww000327rj59a8u1vi	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/	\N	\N	2026-09-15 15:42:39.488
cmu2ubywv000013erwwkq61w5	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/campaigns/create	{"durationMs": 6754}	\N	2026-09-15 15:42:39.488
cmu2uc3u7000427rjsjkja81o	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/	{"durationMs": 6350}	\N	2026-09-15 15:42:45.871
cmu2uc3ud000113er2ptuf3bl	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/gioi-thieu	\N	\N	2026-09-15 15:42:45.878
cmu2uc7ub000213er6ujg0sgt	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/gioi-thieu	{"durationMs": 5198}	\N	2026-09-15 15:42:51.057
cmu2uc7us000313ermd7z0eku	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/dashboard	\N	\N	2026-09-15 15:42:51.077
cmu2uc8fu000413er7ut2a5xl	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/dashboard	{"durationMs": 791}	\N	2026-09-15 15:42:51.834
cmu2uc8gp000513erved5jbl1	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 15:42:51.865
cmu2ucem2000613erf71b2p1c	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 7939}	\N	2026-09-15 15:42:59.834
cmu2upjof0000bjstq4c5a7md	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 3064}	\N	2026-09-15 15:53:12.928
cmu2uqvtg0001bjstailjo5zc	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/	\N	\N	2026-09-15 15:54:15.315
cmu2uqy3l0002bjstqvwt8bm6	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/dashboard	\N	\N	2026-09-15 15:54:18.274
cmu2uqy3l000527rjirmprxc2	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/	{"durationMs": 2953}	\N	2026-09-15 15:54:18.273
cmu2uqyes000627rjvm2199xh	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 15:54:18.676
cmu2uqyg10003bjst2yx0nyq3	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/dashboard	{"durationMs": 408}	\N	2026-09-15 15:54:18.722
cmu2ur5ad0004bjstv8utonn0	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 8902}	\N	2026-09-15 15:54:27.59
cmu2ur5by0005bjstevhul90u	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 0}	\N	2026-09-15 15:54:27.647
cmu2ur5ix0006bjstdyub3ppz	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/dashboard	\N	\N	2026-09-15 15:54:27.897
cmu2ur5vp000713erywua8806	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/dashboard	{"durationMs": 467}	\N	2026-09-15 15:54:28.358
cmu2ur5wj000813ersyypfxie	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/dashboard	{"durationMs": 1}	\N	2026-09-15 15:54:28.388
cmu2ur619000913erxs14towp	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 15:54:28.557
cmu2ur9tr0000g3er438virqb	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4904}	\N	2026-09-15 15:54:33.471
cmu2ur9tu0007bjstx7c451zo	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/purchases	\N	\N	2026-09-15 15:54:33.473
cmu2urhco0008bjste1yickr2	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/purchases	{"durationMs": 9758}	\N	2026-09-15 15:54:43.225
cmu2urhe70001g3ergsogcror	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/chung-tu/TT-UH-202609-403A	\N	\N	2026-09-15 15:54:43.279
cmu2us6bw000a13erjfgkzy0e	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/chung-tu/TT-UH-202609-403A	{"durationMs": 12013}	\N	2026-09-15 15:55:15.595
cmu2us6rz000727rjzx49il20	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/chung-tu/TT-UH-202609-403A	{"durationMs": 1167}	\N	2026-09-15 15:55:16.175
cmu2us72t000827rjxwx4ep5j	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	cf6e6462-2a6d-4d5e-bb09-4e51976c754d	/chung-tu/TT-UH-202609-403A	{"durationMs": 12013}	\N	2026-09-15 15:55:16.565
cmu2vhh2b0000lsnke7ziw3ad	PAGE_LEAVE	\N	\N	12e5f983-1869-45ec-bb89-676ad206bf36	/	{"durationMs": 787}	\N	2026-09-15 16:14:55.907
cmu2vhmba0001lsnkwkk5av2x	PAGE_LEAVE	\N	\N	12e5f983-1869-45ec-bb89-676ad206bf36	/	{"durationMs": 5723}	\N	2026-09-15 16:15:02.711
cmu2vhmcm0000696xeg9lfgm4	PAGE_VIEW	\N	\N	12e5f983-1869-45ec-bb89-676ad206bf36	/auth/login	\N	\N	2026-09-15 16:15:02.758
cmu2vhznd0000tegmi0g86pjy	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	12e5f983-1869-45ec-bb89-676ad206bf36	/dashboard	\N	\N	2026-09-15 16:15:19.994
cmu2vi01g0001tegmho9bzf0k	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	12e5f983-1869-45ec-bb89-676ad206bf36	/dashboard	{"durationMs": 552}	\N	2026-09-15 16:15:20.501
cmu2vi03r0000t49fcqnuvymv	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	12e5f983-1869-45ec-bb89-676ad206bf36	/auth/login	{"durationMs": 17231}	\N	2026-09-15 16:15:20.58
cmu2vi04r0001t49f6zhx5w1e	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	12e5f983-1869-45ec-bb89-676ad206bf36	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 16:15:20.58
cmu2vifr60002t49f159tvlh3	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	12e5f983-1869-45ec-bb89-676ad206bf36	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 20373}	\N	2026-09-15 16:15:40.865
cmu2wxnj10000lpxlndso3xpu	PAGE_LEAVE	\N	\N	1d65a8aa-5f7c-483d-85dd-00ae3dd5920a	/	{"durationMs": 5047}	\N	2026-09-15 16:55:30.397
cmu2wxniz0000l8pibq3odqf2	PAGE_VIEW	\N	\N	1d65a8aa-5f7c-483d-85dd-00ae3dd5920a	/auth/login	\N	\N	2026-09-15 16:55:30.396
cmu2wxy9t0001lpxl3bdlk8p4	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	1d65a8aa-5f7c-483d-85dd-00ae3dd5920a	/auth/login	{"durationMs": 13856}	\N	2026-09-15 16:55:44.321
cmu2wxya00001l8pizjndumam	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	1d65a8aa-5f7c-483d-85dd-00ae3dd5920a	/dashboard	\N	\N	2026-09-15 16:55:44.329
cmu2wxyj30002l8piq3s3xc6m	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	1d65a8aa-5f7c-483d-85dd-00ae3dd5920a	/dashboard	{"durationMs": 422}	\N	2026-09-15 16:55:44.655
cmu2wxyjd0002lpxljskvuwpj	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	1d65a8aa-5f7c-483d-85dd-00ae3dd5920a	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 16:55:44.666
cmu2wydws0000b9mkde7ztf56	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	1d65a8aa-5f7c-483d-85dd-00ae3dd5920a	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 16883}	\N	2026-09-15 16:56:04.586
cmu2ymeh30000rzv7ukwz0v3c	PAGE_VIEW	\N	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/	\N	\N	2026-09-15 17:42:44.677
cmu2yn9ey00009py3sbd0d4gl	PAGE_LEAVE	\N	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/	{"durationMs": 35205}	\N	2026-09-15 17:43:24.776
cmu2ypo3i00019py3hkzz4zni	PAGE_VIEW	\N	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/auth/login	\N	\N	2026-09-15 17:45:17.116
cmu2ypo3v00029py3rgwougrl	PAGE_LEAVE	\N	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/	{"durationMs": 3255}	\N	2026-09-15 17:45:17.131
cmu2ypx1f00039py3jwvd54ea	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/auth/login	{"durationMs": 11550}	\N	2026-09-15 17:45:28.708
cmu2ypx1v0000x6p3xtzi7r72	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/dashboard	\N	\N	2026-09-15 17:45:28.724
cmu2ypxci00049py320zn9wgn	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/dashboard	{"durationMs": 440}	\N	2026-09-15 17:45:29.107
cmu2ypxcx00059py3k7j6irla	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 17:45:29.122
cmu2yqb5k00069py3pbzl478y	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1157}	\N	2026-09-15 17:45:47.001
cmu2yqqqt00079py3s58c2ypv	PAGE_VIEW	\N	\N	f00cc96a-5cb4-4453-a7e3-f88440e92c0c	/	\N	\N	2026-09-15 17:46:07.206
cmu2yqqur0000x22je63pan9o	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 13538}	\N	2026-09-15 17:46:07.316
cmu2zal4a000010gb7q4v6l6d	PAGE_LEAVE	\N	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/	{"durationMs": 21962}	\N	2026-09-15 18:01:33.03
cmu2zalh1000110gbqqbuqm4x	PAGE_LEAVE	\N	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/projects	{"durationMs": 718}	\N	2026-09-15 18:01:33.493
cmu2zam6o0000qz1arb1qvkec	PAGE_VIEW	\N	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/	\N	\N	2026-09-15 18:01:34.413
cmu2zam7b0001qz1afm5qwy1g	PAGE_LEAVE	\N	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/	{"durationMs": 982}	\N	2026-09-15 18:01:34.439
cmu2zam7l0002qz1atvv4t8lu	PAGE_LEAVE	\N	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/auth/login	{"durationMs": 3694}	\N	2026-09-15 18:01:34.413
cmu2zam7l000210gbi9pfhc9k	PAGE_VIEW	\N	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/auth/login	\N	\N	2026-09-15 18:01:34.45
cmu2zaz9y000310gbmaoy5f0h	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/auth/login	{"durationMs": 16911}	\N	2026-09-15 18:01:51.382
cmu2zaza50003qz1a0wibf8mk	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/dashboard	\N	\N	2026-09-15 18:01:51.389
cmu2zazm20004qz1amugzv4ot	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 18:01:51.818
cmu2zazmk000410gbri3sjqnr	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/dashboard	{"durationMs": 454}	\N	2026-09-15 18:01:51.836
cmu2zbbgi00007z7an6rzhxdb	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	23a1c931-ecd0-48b1-b721-4257a922ee36	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 5636}	\N	2026-09-15 18:02:07.167
cmu2zplsw0000dpvsnru8u0eq	PAGE_VIEW	\N	\N	483f31ee-a12b-458d-ab49-9ab61a362f13	/	\N	\N	2026-09-15 18:13:13.756
cmu2zqvwr0000dag6j6q6p2vg	PAGE_LEAVE	\N	\N	7fe73779-83da-423e-9e89-24e066ddaa99	/	{"durationMs": 59412}	\N	2026-09-15 18:14:13.513
cmu2zttea0001dag6g6v8ruox	PAGE_LEAVE	\N	\N	7fe73779-83da-423e-9e89-24e066ddaa99	/	{"durationMs": 1676}	\N	2026-09-15 18:16:30.225
cmu2zvn8900007w55870xjdnh	PAGE_LEAVE	\N	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/	{"durationMs": 63819}	\N	2026-09-15 18:17:44.304
cmu2zvot50002dag6xo4qo54a	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/auth/login	{"durationMs": 13318}	\N	2026-09-15 18:17:57.593
cmu2zvotp0003dag655z3l52c	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/dashboard	\N	\N	2026-09-15 18:17:57.613
cmu2zvp4b0004dag6z400flio	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/dashboard	{"durationMs": 437}	\N	2026-09-15 18:17:57.996
cmu2zvp7m00017w551umusx6t	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 18:17:58.115
cmu2zw2v7000012m2kxoca8h6	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060/customize	\N	\N	2026-09-15 18:18:15.808
cmu2zw2w3000112m2rqyeei2q	PAGE_VIEW	\N	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/	\N	\N	2026-09-15 18:18:15.808
cmu2zw3qz000212m28wsobkyy	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 18:18:16.956
cmu2zwa4p000312m2dtok3133	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 8168}	\N	2026-09-15 18:18:25.225
cmu2zw3qs0007dag6kxd78s9e	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060/customize	{"durationMs": 1729}	\N	2026-09-15 18:18:16.948
cmu3jkfcj0000nxgkxnwo4zlm	PAGE_VIEW	\N	\N	a2f9a183-3917-4348-9d2b-df1449b4f3c7	/auth/login	\N	\N	2026-09-16 03:29:03.257
cmu2zws2g0000vn7hx8t2r2i5	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	c70e6d44-ff2d-4b6e-8f63-c964660513f5	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 5489}	\N	2026-09-15 18:18:48.472
cmu2zw2eu00027w55r9jenzwr	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 17206}	\N	2026-09-15 18:18:15.221
cmu2zzwbj000412m258ka46r8	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/	\N	\N	2026-09-15 18:21:13.95
cmu2zzwbp00037w55ifb07sn1	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 18587}	\N	2026-09-15 18:21:13.955
cmu2zzyao00047w55u76u8bf8	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/	{"durationMs": 2559}	\N	2026-09-15 18:21:16.512
cmu2zzyap000512m252a6hvgc	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/projects	\N	\N	2026-09-15 18:21:16.513
cmu300aez0008dag6faljuag9	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/projects	{"durationMs": 15706}	\N	2026-09-15 18:21:32.22
cmu300af7000612m2pcs682tu	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/auth/login	\N	\N	2026-09-15 18:21:32.226
cmu300s2z0009dag6n8gh4g79	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/auth/login	{"durationMs": 8571}	\N	2026-09-15 18:21:55.114
cmu300t2m000adag65og01fl8	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/auth/login	{"durationMs": 1193}	\N	2026-09-15 18:21:56.399
cmu308sqv00057w559i1ycu4m	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ca5e6fdd-0e0f-42ba-97b1-4e8e70a2783f	/auth/login	{"durationMs": 10663}	\N	2026-09-15 18:28:09.224
cmu30o34y00003kwj30bjgkgp	PAGE_VIEW	\N	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/auth/login	\N	\N	2026-09-15 18:40:02.528
cmu30o35i00013kwjwwm6dh89	PAGE_LEAVE	\N	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/	{"durationMs": 47637}	\N	2026-09-15 18:40:02.528
cmu30oma900023kwj1e9xa67y	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/dashboard	\N	\N	2026-09-15 18:40:27.345
cmu30omag0000ho34j19yifjv	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/auth/login	{"durationMs": 37191}	\N	2026-09-15 18:40:27.353
cmu30omme00033kwjckdx6gus	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 18:40:27.782
cmu30ommx00043kwj027csw7r	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/dashboard	{"durationMs": 469}	\N	2026-09-15 18:40:27.801
cmu30osj800053kwjpkivvjt7	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 7695}	\N	2026-09-15 18:40:35.445
cmu30p43b00063kwj28od184r	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/	\N	\N	2026-09-15 18:40:50.423
cmu30paip00073kwj688ll0xk	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/	{"durationMs": 8331}	\N	2026-09-15 18:40:58.754
cmu30pajs00083kwju3uh5h0s	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 18:40:58.793
cmu30pbb900093kwjewpimn7c	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	118a1e30-ac58-4e8d-8546-0b32c6b6f5ce	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1024}	\N	2026-09-15 18:40:59.781
cmu30zcrv0000a119c8ftgymj	PAGE_LEAVE	\N	\N	a3ab88ba-0cc9-4ae9-8d0c-b112ace50e51	/	{"durationMs": 18185}	\N	2026-09-15 18:48:48.233
cmu30zhcq0000wxw7h845t2np	PAGE_VIEW	\N	\N	a3ab88ba-0cc9-4ae9-8d0c-b112ace50e51	/auth/login	\N	\N	2026-09-15 18:48:54.165
cmu30zlpu0001wxw798r0g8qv	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a3ab88ba-0cc9-4ae9-8d0c-b112ace50e51	/auth/login	{"durationMs": 13569}	\N	2026-09-15 18:48:59.827
cmu30zlr90001a1193odn5xh8	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a3ab88ba-0cc9-4ae9-8d0c-b112ace50e51	/dashboard	\N	\N	2026-09-15 18:48:59.877
cmu30zm2g0002wxw777mgb55b	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a3ab88ba-0cc9-4ae9-8d0c-b112ace50e51	/dashboard	{"durationMs": 486}	\N	2026-09-15 18:49:00.28
cmu30zs3i0000o12ve24fwrqd	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a3ab88ba-0cc9-4ae9-8d0c-b112ace50e51	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4466}	\N	2026-09-15 18:49:08.092
cmu30zs450001o12vi2co4r88	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a3ab88ba-0cc9-4ae9-8d0c-b112ace50e51	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 18:49:08.092
cmu31pa1z0000uwijdrr49vcl	PAGE_VIEW	\N	\N	2c5e34b2-b677-4b60-91a7-3101291684c6	/projects	\N	\N	2026-09-15 19:08:57.765
cmu31pa2m0001uwij09jqwjar	PAGE_LEAVE	\N	\N	2c5e34b2-b677-4b60-91a7-3101291684c6	/projects	{"durationMs": 1153}	\N	2026-09-15 19:08:57.765
cmu31p24e0000at0pqr0ouwz6	PAGE_VIEW	\N	\N	2c5e34b2-b677-4b60-91a7-3101291684c6	/auth/login	\N	\N	2026-09-15 19:08:47.487
cmu31pmmg0001at0pbz0p7ykq	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	2c5e34b2-b677-4b60-91a7-3101291684c6	/dashboard	\N	\N	2026-09-15 19:09:14.057
cmu31pmn90002at0pwks4t2fm	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	2c5e34b2-b677-4b60-91a7-3101291684c6	/auth/login	{"durationMs": 26550}	\N	2026-09-15 19:09:14.085
cmu31pmwy0003at0p80l0nht4	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	2c5e34b2-b677-4b60-91a7-3101291684c6	/dashboard	{"durationMs": 443}	\N	2026-09-15 19:09:14.435
cmu31pmx00002uwijh0rj7oyr	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	2c5e34b2-b677-4b60-91a7-3101291684c6	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 19:09:14.434
cmu31ppb50000125o2lnanzdv	PAGE_LEAVE	\N	\N	2c5e34b2-b677-4b60-91a7-3101291684c6	/	{"durationMs": 28640}	\N	2026-09-15 19:09:14.666
cmu31ppbe0001125opf8qwz4y	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	2c5e34b2-b677-4b60-91a7-3101291684c6	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 3109}	\N	2026-09-15 19:09:17.546
cmu32cq8m000010vbqxva2ha0	PAGE_VIEW	\N	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/	\N	\N	2026-09-15 19:27:11.826
cmu32cthp0000lhskqycrwtyf	PAGE_VIEW	\N	\N	fbc83385-fc4c-4f91-a5bd-aff47405be98	/	\N	\N	2026-09-15 19:27:16.045
cmu32cthu0000nrtneqikrs6u	PAGE_VIEW	\N	\N	5bc8cfe2-8c9b-413e-bbf6-62a0263ce5ed	/	\N	\N	2026-09-15 19:27:16.051
cmu32cuiu000012xom69kaqom	PAGE_LEAVE	\N	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/	{"durationMs": 5975}	\N	2026-09-15 19:27:17.382
cmu32cuix0000oj84vffn1sx7	PAGE_VIEW	\N	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/auth/login	\N	\N	2026-09-15 19:27:17.385
cmu32d4ai000112xoq6shp9ip	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/auth/login	{"durationMs": 12588}	\N	2026-09-15 19:27:30.042
cmu32d4ai0001oj84n01oyg3k	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/dashboard	\N	\N	2026-09-15 19:27:30.042
cmu32d4o50002oj847ni2oprt	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 19:27:30.533
cmv4q934o0000s092zu1tgu96	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 8585}	\N	2026-10-12 04:03:41.209
cmv50r9ye0005njbh5p64pq7p	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/dashboard	\N	\N	2026-10-12 08:57:46.022
cmv50rjfw0007njbhur3dfzon	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-10-12 08:57:58.317
cmv50sdwx000fnjbhku7i566x	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-12 08:58:37.81
cmv50t86k000hnjbhpa4e39fm	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 9054}	\N	2026-10-12 08:59:17.036
cmu32d4o9000212xonunj330i	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/dashboard	{"durationMs": 571}	\N	2026-09-15 19:27:30.537
cmu32d9yb0000mbx6ryf2l4ko	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 6797}	\N	2026-09-15 19:27:37.378
cmu32d9ws000312xo3mrah482	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060/edit	\N	\N	2026-09-15 19:27:37.322
cmu32dcp10001mbx6hbphe9qv	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060/edit	{"durationMs": 3588}	\N	2026-09-15 19:27:40.933
cmu32dcp2000412xok0r5oq4o	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/dashboard	\N	\N	2026-09-15 19:27:40.934
cmu32dczt000512xoo6w108im	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/dashboard	{"durationMs": 414}	\N	2026-09-15 19:27:41.321
cmu32dczw0002mbx60wksax43	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 19:27:41.324
cmu32de4l0003mbx6ra9ovg57	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	70b5671d-ea0e-44ee-a594-05055922b3a9	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1452}	\N	2026-09-15 19:27:42.789
cmu3315qs0000g3p6hjje2424	PAGE_VIEW	\N	\N	63742898-1dbf-4649-8a6a-3b242751a6ef	/auth/login	\N	\N	2026-09-15 19:46:11.669
cmu3315si0000seo2yrlyl3rv	PAGE_LEAVE	\N	\N	63742898-1dbf-4649-8a6a-3b242751a6ef	/	{"durationMs": 1613}	\N	2026-09-15 19:46:11.728
cmu331m270000x5ff8rcanvhl	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	63742898-1dbf-4649-8a6a-3b242751a6ef	/auth/login	{"durationMs": 21165}	\N	2026-09-15 19:46:32.815
cmu331m2p0001x5ffrohyht39	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	63742898-1dbf-4649-8a6a-3b242751a6ef	/dashboard	\N	\N	2026-09-15 19:46:32.833
cmu331mdq0002x5ffn13rea5j	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	63742898-1dbf-4649-8a6a-3b242751a6ef	/dashboard	{"durationMs": 454}	\N	2026-09-15 19:46:33.23
cmu331mdv0001seo2py0mqtf3	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	63742898-1dbf-4649-8a6a-3b242751a6ef	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 19:46:33.235
cmu331ze80000atcjcs98h9yk	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	63742898-1dbf-4649-8a6a-3b242751a6ef	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 7744}	\N	2026-09-15 19:46:50.094
cmu33csvs0000y056lzlxud15	PAGE_LEAVE	\N	\N	4cfeb976-4c23-4fcc-ab40-52136e0f7a95	/	{"durationMs": 1590}	\N	2026-09-15 19:55:14.873
cmu33csvw0000yg2jmmdeysoo	PAGE_VIEW	\N	\N	4cfeb976-4c23-4fcc-ab40-52136e0f7a95	/auth/login	\N	\N	2026-09-15 19:55:14.876
cmu33d9mx0000cun1w1hb28gr	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4cfeb976-4c23-4fcc-ab40-52136e0f7a95	/auth/login	{"durationMs": 21679}	\N	2026-09-15 19:55:36.585
cmu33d9xh0001cun1685qypyo	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4cfeb976-4c23-4fcc-ab40-52136e0f7a95	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 19:55:36.966
cmu33dc1y0002cun1u9vsdsua	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4cfeb976-4c23-4fcc-ab40-52136e0f7a95	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2767}	\N	2026-09-15 19:55:39.719
cmu34tq7v0000r8kbnqa5p1te	PAGE_LEAVE	\N	\N	61dd8806-b5b5-44c4-8ab9-78257afe179f	/	{"durationMs": 3235}	\N	2026-09-15 20:36:24.187
cmu34tq91000013zko10ylcdr	PAGE_VIEW	\N	\N	61dd8806-b5b5-44c4-8ab9-78257afe179f	/auth/login	\N	\N	2026-09-15 20:36:24.23
cmu34u9tl000012vmvno5od6r	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	61dd8806-b5b5-44c4-8ab9-78257afe179f	/dashboard	\N	\N	2026-09-15 20:36:49.593
cmu34ua37000112vm9xacn580	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	61dd8806-b5b5-44c4-8ab9-78257afe179f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-15 20:36:49.94
cmu34ua3w000212vmkpfoo9tg	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	61dd8806-b5b5-44c4-8ab9-78257afe179f	/dashboard	{"durationMs": 399}	\N	2026-09-15 20:36:49.964
cmu34ucue0000spwsglh6hch3	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	61dd8806-b5b5-44c4-8ab9-78257afe179f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 3585}	\N	2026-09-15 20:36:53.51
cmu34ucuf0001spwsha949fkc	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	61dd8806-b5b5-44c4-8ab9-78257afe179f	/auth/login	{"durationMs": 25366}	\N	2026-09-15 20:36:50.016
cmu3jcpzc0000jpcrdcdzbm0g	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/	{"durationMs": 227}	\N	2026-09-16 03:23:04.966
cmu3jcq0k0001jpcrq2ovnuk9	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5149988-75b6-49a5-a491-57f7d3e989a9	/	{"durationMs": 0}	\N	2026-09-16 03:23:04.98
cmu3jd656000012qgehgu2b2e	PAGE_VIEW	\N	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/auth/login	\N	\N	2026-09-16 03:23:25.915
cmu3jd65800008s50qw3cnyrt	PAGE_LEAVE	\N	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/	{"durationMs": 2863}	\N	2026-09-16 03:23:25.917
cmu3jdjf9000010ezuyz0p8uh	PAGE_LEAVE	\N	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/auth/login	{"durationMs": 6487}	\N	2026-09-16 03:23:43.123
cmu3jdota00018s50wpiz8969	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/dashboard	\N	\N	2026-09-16 03:23:50.11
cmu3jdotg000110ezdqltk5qa	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/auth/login	{"durationMs": 16653}	\N	2026-09-16 03:23:50.116
cmu3jdp39000210ezb5iexke0	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 03:23:50.469
cmu3jdp3e00028s50hqkrks6d	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/dashboard	{"durationMs": 445}	\N	2026-09-16 03:23:50.474
cmu3jdsvy00038s50iukkmlu5	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4948}	\N	2026-09-16 03:23:55.391
cmu3jdsx0000112qgmdy82qe1	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060/edit	\N	\N	2026-09-16 03:23:55.429
cmu3jdu2b000212qg3dsvsy9l	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 03:23:56.915
cmu3jdu2e00048s50r4colrk2	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060/edit	{"durationMs": 1479}	\N	2026-09-16 03:23:56.919
cmu3jduu400058s504jiu4xec	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1022}	\N	2026-09-16 03:23:57.916
cmu3jkdw30000xtaxrw4uzp1o	PAGE_LEAVE	\N	\N	a2f9a183-3917-4348-9d2b-df1449b4f3c7	/	{"durationMs": 24339}	\N	2026-09-16 03:29:02.545
cmu3jkfcw0001nxgkiuu9sw7i	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a2f9a183-3917-4348-9d2b-df1449b4f3c7	/auth/login	{"durationMs": 10428}	\N	2026-09-16 03:29:04.448
cmu3jmoai0002nxgkktao4sry	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a2f9a183-3917-4348-9d2b-df1449b4f3c7	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 0}	\N	2026-09-16 03:30:49.337
cmv4q9gwb0000c30yr86lbcue	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 12348}	\N	2026-10-12 04:03:59.05
cmv4q9kxq0001c30y603ie4w4	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f397a0ef-42f6-49ae-aac2-2a19d6fab2a5	/campaigns/album-mam-sang-1787564107725-3c1kg	\N	\N	2026-10-12 04:04:04.287
cmv4q9px80002c30yjuaed36n	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog	\N	\N	2026-10-12 04:04:10.748
cmv50rvni0008njbhzfpj1rc8	PAGE_LEAVE	\N	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 18772}	\N	2026-10-12 08:58:14.143
cmv50rvpa0009njbh6fol1xvx	PAGE_VIEW	\N	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/	\N	\N	2026-10-12 08:58:14.207
cmv50ry98000anjbhbxqiocyr	PAGE_LEAVE	\N	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/	{"durationMs": 3379}	\N	2026-10-12 08:58:17.517
cmv50ryb4000bnjbh7pe7kotu	PAGE_VIEW	\N	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/auth/login	\N	\N	2026-10-12 08:58:17.584
cmv50sbb6000cnjbhq51ae4hf	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/auth/login	{"durationMs": 16741}	\N	2026-10-12 08:58:34.434
cmu3jkfcv0001xtaxavt9moe8	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a2f9a183-3917-4348-9d2b-df1449b4f3c7	/dashboard	\N	\N	2026-09-16 03:29:04.447
cmu3jkfnd0002xtaxpnua3zsj	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a2f9a183-3917-4348-9d2b-df1449b4f3c7	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 03:29:04.825
cmu3jkfnx0003xtaxazaav2y2	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a2f9a183-3917-4348-9d2b-df1449b4f3c7	/dashboard	{"durationMs": 383}	\N	2026-09-16 03:29:04.846
cmu3jkyn20004xtaxtza40jdg	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a2f9a183-3917-4348-9d2b-df1449b4f3c7	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 24656}	\N	2026-09-16 03:29:29.436
cmu3jm9zv0005xtaxlghacibc	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a2f9a183-3917-4348-9d2b-df1449b4f3c7	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 10364}	\N	2026-09-16 03:30:30.811
cmu3jmomj0000113ahe06d4pf	PAGE_VIEW	\N	\N	8682ca6a-a240-4b24-bfe0-e50cf1dd2b5a	/	\N	\N	2026-09-16 03:30:49.519
cmu3jmoa60006xtaxtbf7qql8	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a2f9a183-3917-4348-9d2b-df1449b4f3c7	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2403}	\N	2026-09-16 03:30:49.325
cmu3jmsgh0003nxgkslitkabz	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	35b0dc6c-1152-4248-836b-c87d20ca5629	/dashboard	\N	\N	2026-09-16 03:30:54.737
cmu3jmt4g0004nxgkvzmpcygv	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	35b0dc6c-1152-4248-836b-c87d20ca5629	/dashboard	{"durationMs": 852}	\N	2026-09-16 03:30:55.6
cmu3jmt650000wqbktylnem4j	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	35b0dc6c-1152-4248-836b-c87d20ca5629	/	{"durationMs": 2595}	\N	2026-09-16 03:30:55.658
cmu3jmt6x0001wqbkhoo0qs9c	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	35b0dc6c-1152-4248-836b-c87d20ca5629	/	\N	\N	2026-09-16 03:30:55.658
cmu3jmt760002wqbkzj2n82yb	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	35b0dc6c-1152-4248-836b-c87d20ca5629	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 03:30:55.658
cmu3jmudg0003wqbk1xfhwncf	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	35b0dc6c-1152-4248-836b-c87d20ca5629	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1615}	\N	2026-09-16 03:30:57.221
cmu3kqx290007xtaxm6uvcz83	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	\N	\N	2026-09-16 04:02:06.944
cmu3kqz910000pgbftj54qcuo	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	{"durationMs": 2828}	\N	2026-09-16 04:02:09.781
cmu3kqz9o0000o9d54mwc2h9j	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 04:02:09.804
cmu3kqzww0001pgbfsi1jtati	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 861}	\N	2026-09-16 04:02:10.641
cmu3kqzx50000vxd9sik6xfl5	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 04:02:10.65
cmu3kr6hs0001o9d5x4b1bhex	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 8495}	\N	2026-09-16 04:02:19.169
cmu3le6a30000jma7zma8dlwx	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	\N	\N	2026-09-16 04:20:11.979
cmu3legty0000u2o7dueuhirc	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	{"durationMs": 13750}	\N	2026-09-16 04:20:25.655
cmu3legtx0001jma71a0xf4k5	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/create	\N	\N	2026-09-16 04:20:25.652
cmu3leh720001u2o7nu3ry3kt	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/create	{"durationMs": 478}	\N	2026-09-16 04:20:26.127
cmu3leh730002jma7bnnr71tm	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	\N	\N	2026-09-16 04:20:26.127
cmu3lekwc0002u2o7j41fat6l	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	{"durationMs": 4823}	\N	2026-09-16 04:20:30.923
cmu3lekwd0003jma7u54u2wg3	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	{"durationMs": 0}	\N	2026-09-16 04:20:30.925
cmu3lel3g0004jma7tulrsxin	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/register	\N	\N	2026-09-16 04:20:31.18
cmu3lessi0005jma7vl8a34ju	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	\N	\N	2026-09-16 04:20:41.153
cmu3lestu0000pwwsn2i47hnk	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/register	{"durationMs": 10009}	\N	2026-09-16 04:20:41.202
cmu3lf08b0001pwwso3akpq2b	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	{"durationMs": 9624}	\N	2026-09-16 04:20:50.796
cmu3lf0980002pwws1m46xz3u	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 04:20:50.828
cmu3lf0h50006jma7nphh8saz	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 342}	\N	2026-09-16 04:20:51.113
cmu3lf0hc0003u2o7p6vq2o5l	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	\N	2026-09-16 04:20:51.119
cmu3lfa6j0003pwwsr1ew9gf7	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/f88cb919-d8c3-412f-8996-0f74ee3ea443	{"durationMs": 12583}	\N	2026-09-16 04:21:03.692
cmu3lfa6o0007jma7pb8wxgpu	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	\N	\N	2026-09-16 04:21:03.695
cmu3lfbqa0008jma7fo9qmp7n	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	{"durationMs": 2006}	\N	2026-09-16 04:21:05.698
cmu3lfbra0009jma7a63kqoc6	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/create	\N	\N	2026-09-16 04:21:05.734
cmu3lfbyk000ajma7urtu71yh	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/create	{"durationMs": 312}	\N	2026-09-16 04:21:05.997
cmu3lfbyy0004pwwsqtz1gcct	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	\N	\N	2026-09-16 04:21:06.008
cmu3lfr3w000bjma7znbhye8o	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	{"durationMs": 19617}	\N	2026-09-16 04:21:25.628
cmu3lfr4b0005pwwsyubnbbwp	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	\N	\N	2026-09-16 04:21:25.642
cmu3ljchl000cjma7riadk1o1	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"durationMs": 167686}	\N	2026-09-16 04:24:13.305
cmu3ljcho0006pwwsj5keogwa	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	\N	\N	2026-09-16 04:24:13.306
cmu3lje0w000djma7rhfpelt6	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	\N	\N	2026-09-16 04:24:15.296
cmu3lje0s0007pwws8ps7qatr	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	{"durationMs": 1971}	\N	2026-09-16 04:24:15.292
cmu3ljgtj000ejma7f5rjib1q	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	{"durationMs": 3634}	\N	2026-09-16 04:24:18.92
cmu3ljgtn0008pwwsti46q992	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 04:24:18.923
cmu3ljh350009pwwss5mtcq6r	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 355}	\N	2026-09-16 04:24:19.266
cmu3lji6f000fjma7tkob63cw	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/purchases	\N	\N	2026-09-16 04:24:20.679
cmu3ljm23000gjma7wrhphi1e	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/chung-tu/TT-UH-202609-403A	\N	\N	2026-09-16 04:24:25.707
cmu3ll6w5000apwwskuugykey	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	\N	\N	2026-09-16 04:25:39.363
cmv4qbr570000sr3a4vf63q1d	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f397a0ef-42f6-49ae-aac2-2a19d6fab2a5	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 101319}	\N	2026-10-12 04:05:45.644
cmv50sbba000dnjbhqzqdevny	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/dashboard	\N	\N	2026-10-12 08:58:34.439
cmv50syqi000gnjbh9gg8gsx5	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 27613}	\N	2026-10-12 08:59:04.795
cmu3ljh410004u2o7vyvvl1bp	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 04:24:19.295
cmu3lji6i0005u2o7sfaow3e6	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1402}	\N	2026-09-16 04:24:20.682
cmu3ljm250006u2o7qo9nmjx6	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/purchases	{"durationMs": 5007}	\N	2026-09-16 04:24:25.71
cmu3lkv3s0007u2o76zawjfjq	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/chung-tu/TT-UH-202609-403A	{"durationMs": 58382}	\N	2026-09-16 04:25:24.088
cmu3lll260008u2o7b9in91np	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/projects/cmt71ii4d0001y4v2wo8sxbf9	\N	\N	2026-09-16 04:25:57.725
cmu3llt0h0009u2o7mefl7bpy	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/projects/cmt71ii4d0001y4v2wo8sxbf9	{"durationMs": 10309}	\N	2026-09-16 04:26:08.033
cmv4qbsfr0003c30yxvxszd1u	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 1686}	\N	2026-10-12 04:05:47.319
cmv4qbu2b0004c30ye9ke6qcr	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog	{"durationMs": 2137}	\N	2026-10-12 04:05:49.428
cmv4qf3mf0005c30ykynahm0v	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog	{"durationMs": 18520}	\N	2026-10-12 04:08:21.783
cmv50sdlu000enjbhyhprs2ry	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ee2e8439-b19f-4321-aa39-98f9039baaa5	/dashboard	{"durationMs": 3043}	\N	2026-10-12 08:58:37.41
cmu3lkv3w000hjma7bg5a803z	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/blog	\N	\N	2026-09-16 04:25:24.093
cmu3lll1u000bpwwsrp5hpkpg	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	{"durationMs": 18352}	\N	2026-09-16 04:25:57.714
cmu3llt0j000cpwwsggst171x	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 04:26:08.034
cmu3ll6vw000ijma77htcqef9	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/blog	{"durationMs": 15287}	\N	2026-09-16 04:25:39.355
cmu3llt8o000dpwwsaatmo1za	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 319}	\N	2026-09-16 04:26:08.328
cmu3llt9h000jjma745jmf0cv	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 04:26:08.356
cmu3lmifh000epwws4f4zdw8y	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	\N	\N	2026-09-16 04:26:40.972
cmu3lmig0000kjma7gff6mnej	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 32658}	\N	2026-09-16 04:26:40.99
cmu3lmjib000ljma7t0kq1v8v	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	{"durationMs": 1373}	\N	2026-09-16 04:26:42.372
cmu3lmjip000au2o7nye8q40w	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	\N	\N	2026-09-16 04:26:42.385
cmu3lmp2w000mjma72syi3ct2	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 04:26:49.593
cmu3lmp32000bu2o7lj7hem54	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	{"durationMs": 7188}	\N	2026-09-16 04:26:49.599
cmu3lmpbs000cu2o7oo793h3t	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 343}	\N	2026-09-16 04:26:49.912
cmu3lmpbx000fpwws5fe8enhm	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-16 04:26:49.918
cmu3lmpxo000njma7m05omuai	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 795}	\N	2026-09-16 04:26:50.701
cmu3lmpxx000gpwws81tlrw23	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 04:26:50.71
cmu3lmq5g000hpwwsznjayxwe	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-16 04:26:50.981
cmu3lmq67000ipwwsf6moyl3e	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 283}	\N	2026-09-16 04:26:51.007
cmu3lnhy5000ojma7ucvmftna	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn/customize	\N	\N	2026-09-16 04:27:27.005
cmu3lnhy9000jpwwsmaclgra3	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 36012}	\N	2026-09-16 04:27:27.01
cmu3lor3e000fu2o7x7j0ilmg	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	\N	\N	2026-09-16 04:28:25.515
cmu3loug1000kpwwskzn92dhy	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn/customize	{"durationMs": 58521}	\N	2026-09-16 04:28:25.514
cmu3loug5000gu2o7jrnttcqb	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	{"durationMs": 4343}	\N	2026-09-16 04:28:29.861
cmu3loug8000lpwwsfkimfrzu	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 04:28:29.865
cmu3louvu000mpwwsbam5bwcl	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 575}	\N	2026-09-16 04:28:30.427
cmu3louw1000hu2o7wwma2xhs	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-16 04:28:30.433
cmu3lqekn000iu2o7tchhebv9	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard/creator/edit/vuon-rau-khong-rac-thai-1787564108182-5kp00	\N	\N	2026-09-16 04:29:42.6
cmu3lqf3e000pjma78s1ygi2j	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 72186}	\N	2026-09-16 04:29:42.609
cmu3lscpz000qjma77ch3okte	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard/creator/edit/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 90892}	\N	2026-09-16 04:31:13.51
cmu3lscqh000rjma7ldqhginm	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-16 04:31:13.529
cmu3ltvg4000ju2o7fl27ym50	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 70909}	\N	2026-09-16 04:32:24.437
cmu3ltvgn000ku2o712wpyqlw	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	\N	\N	2026-09-16 04:32:24.455
cmu3lvot5000sjma7gt1fduex	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 71844}	\N	2026-09-16 04:33:36.257
cmu3m66e20000izysfu6vus1c	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 52915}	\N	2026-09-16 04:41:58.323
cmu3m699j0001izysv2iq8on0	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	{"durationMs": 4385}	\N	2026-09-16 04:42:02.215
cmu3m699y0000b2s7eij6jy5f	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/album-mam-sang-1787564107725-3c1kg	\N	\N	2026-09-16 04:42:02.231
cmu3m6yqg0002izysrdr7f3le	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 33021}	\N	2026-09-16 04:42:35.223
cmu3m77fr0001b2s7hsfphcs1	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	\N	\N	2026-09-16 04:42:35.226
cmu3m77wf0003izysojkwe996	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 04:42:47.104
cmu3m77wb0002b2s771w0ne6j	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	{"durationMs": 11826}	\N	2026-09-16 04:42:47.099
cmu3m78vn0003b2s7dclxveez	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 576}	\N	2026-09-16 04:42:47.664
cmu3m78bl0004izystaf2q5ap	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-16 04:42:47.65
cmu3m7f9j0004b2s703diq6n7	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 9042}	\N	2026-09-16 04:42:56.648
cmu3m7f9n0005izysm62xl2vz	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	\N	\N	2026-09-16 04:42:56.65
cmu3m7g6t0006izysligh1v0z	PAGE_LEAVE	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	{"durationMs": 1177}	\N	2026-09-16 04:42:57.845
cmu3m7jdy0007izysd45gun4u	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	{"durationMs": 4132}	\N	2026-09-16 04:43:01.991
cmu3m7jm10008izyseue21ofq	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 298}	\N	2026-09-16 04:43:02.281
cmu3m7k4y0009izys3vr64cgc	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 04:43:02.963
cmu3m7kcf000aizysqc37kmeb	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 04:43:03.231
cmu3m7lb8000bizysbvxjzufj	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1252}	\N	2026-09-16 04:43:04.485
cmv4qdmmv0000ecok70u5rh7v	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog	{"durationMs": 29306}	\N	2026-10-12 04:07:13.111
cmu3m7g6w0005b2s73rgytigm	PAGE_VIEW	\N	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/auth/login	\N	\N	2026-09-16 04:42:57.849
cmv4qglsu0006c30y2w22bt1b	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog	{"durationMs": 4285}	\N	2026-10-12 04:09:31.998
cmv4qi60k0007c30yl7m5ypf4	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog	{"durationMs": 41261}	\N	2026-10-12 04:10:44.852
cmv4qlcao000bc30yvab0gq5k	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/hanh-trinh-mam-xanh-tu-te	{"durationMs": 640}	\N	2026-10-12 04:13:12.96
cmv4qlcb8000cc30y1hnzdfwh	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/hanh-trinh-mam-xanh-tu-te	{"durationMs": 0}	\N	2026-10-12 04:13:12.98
cmv4qm0ez000dc30y1zvi1gkv	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/qa-20261012-mv4nq083-blog-luu-nhap	{"durationMs": 16705}	\N	2026-10-12 04:13:38.482
cmu3m7je10006b2s7vb4tg7z3	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 04:43:01.993
cmu3m7jly0007b2s7m3fagi3n	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 04:43:02.278
cmu3m7k4y0000g8aqwdgg2swp	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 655}	\N	2026-09-16 04:43:02.962
cmu3m7kc70001g8aq70tw1ceu	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 288}	\N	2026-09-16 04:43:03.223
cmu3mqs9e0008b2s7dvpgf4q5	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	\N	\N	2026-09-16 04:57:59.954
cmu3mqw3n0002g8aqgssrepto	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/users/search	\N	\N	2026-09-16 04:58:04.931
cmu3mqw3m0009b2s7267mmxsg	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/	{"durationMs": 5011}	\N	2026-09-16 04:58:04.93
cmu3mr1kf000ab2s7nigu1r0c	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/projects	\N	\N	2026-09-16 04:58:12
cmu3mr1lj000bb2s7065ltfjf	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/users/search	{"durationMs": 7041}	\N	2026-09-16 04:58:12.055
cmu3mr6he000cb2s7q392c3hc	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/projects	{"durationMs": 6352}	\N	2026-09-16 04:58:18.386
cmu3mr99s000db2s7h08elqb6	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/projects	{"durationMs": 1557}	\N	2026-09-16 04:58:22
cmu3nb4a60000o8n19w4tsaol	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/projects	{"durationMs": 23676}	\N	2026-09-16 05:13:48.653
cmu3nb4ao0001o8n1379zm6hj	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	\N	\N	2026-09-16 05:13:48.672
cmu3ncdqt000022cq66ejurbg	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 58882}	\N	2026-09-16 05:14:47.571
cmu3nigmq0002o8n1jyldf4yu	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 7216}	\N	2026-09-16 05:19:31.25
cmu3nigne000061t8hzakops3	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 05:19:31.275
cmu3nigyc0003o8n15jg02bls	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 428}	\N	2026-09-16 05:19:31.669
cmu3nigyf000161t8m1ojl46f	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 05:19:31.672
cmu3nijtk000122cq5c2im65u	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 3723}	\N	2026-09-16 05:19:35.384
cmu3o7ydl0004o8n1ozqnlmvn	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	\N	\N	2026-09-16 05:39:20.649
cmu3o7yo80005o8n1elkq8c4y	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 05:39:21.032
cmu3o7yp20006o8n1rmsaqr8p	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/dashboard	{"durationMs": 392}	\N	2026-09-16 05:39:21.062
cmu3o8wpr0007o8n1cvj4wj6i	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	84ea7667-98f6-4ca3-90fe-89ce076fa99d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 44125}	\N	2026-09-16 05:40:05.151
cmu3olg6f0000jdphr7crctiz	PAGE_LEAVE	\N	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/	{"durationMs": 5426}	\N	2026-09-16 05:49:50.248
cmu3om66v0000d06rq9yiq15j	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/auth/login	{"durationMs": 33651}	\N	2026-09-16 05:50:23.959
cmu3om6v9000010yxybddv7hg	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/dashboard	\N	\N	2026-09-16 05:50:24.834
cmu3om6w1000110yxt65m96vw	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/dashboard	{"durationMs": 591}	\N	2026-09-16 05:50:24.835
cmu3om6w9000210yx001qir5y	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 05:50:24.834
cmu3omb39000310yxq2uksx7f	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 5805}	\N	2026-09-16 05:50:30.31
cmu3onsl4000410yxoyo93s63	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/policy/terms	\N	\N	2026-09-16 05:51:39.637
cmu3onutc000510yxxrc45bwb	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/policy/terms	{"durationMs": 2870}	\N	2026-09-16 05:51:42.529
cmu3onvn9000610yxinu92p99	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/policy/privacy	\N	\N	2026-09-16 05:51:43.605
cmu3onxcr000710yxpi3oojhn	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/policy/privacy	{"durationMs": 2218}	\N	2026-09-16 05:51:45.82
cmu3onyqt000810yx5eqo0zri	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/huong-dan/thue	\N	\N	2026-09-16 05:51:47.622
cmu3ooezv000910yxfxee23n8	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/policy/creator	\N	\N	2026-09-16 05:52:08.682
cmu3oof020001d06rxnc7p69y	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/huong-dan/thue	{"durationMs": 21043}	\N	2026-09-16 05:52:08.688
cmu3oomn70002d06rqaw42i0y	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/huong-dan/thue	\N	\N	2026-09-16 05:52:18.595
cmu3oomo50003d06rq46co7yw	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/policy/creator	{"durationMs": 9918}	\N	2026-09-16 05:52:18.629
cmu3opaha0004d06r7x5xod5x	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/huong-dan/thue	{"durationMs": 30873}	\N	2026-09-16 05:52:49.485
cmu3p375o000a10yxakulgftp	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/huong-dan/thue	{"durationMs": 2678}	\N	2026-09-16 06:03:38.365
cmu3p39oc000b10yxxfc9c3gb	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/huong-dan/thue	{"durationMs": 583}	\N	2026-09-16 06:03:41.629
cmu3p39ow000c10yxsuyo2uyv	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	58d7eaf0-9cbd-4fda-9aa2-cd5f6ecc5b1f	/huong-dan/thue	{"durationMs": 0}	\N	2026-09-16 06:03:41.649
cmu3p3cq80000jy83a78004jd	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	32a0cb30-e255-4853-bbad-29767b0b9aec	/	\N	\N	2026-09-16 06:03:45.585
cmu3p3d7t0005d06rc01yw4xp	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	32a0cb30-e255-4853-bbad-29767b0b9aec	/	{"durationMs": 644}	\N	2026-09-16 06:03:46.218
cmu3p3n2o0006d06rv9rrbnw5	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	32a0cb30-e255-4853-bbad-29767b0b9aec	/dashboard	\N	\N	2026-09-16 06:03:58.992
cmu3p3n2w0001jy83te76cw0t	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	32a0cb30-e255-4853-bbad-29767b0b9aec	/	{"durationMs": 2446}	\N	2026-09-16 06:03:58.999
cmu3p3nj10002jy83i0batjcf	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	32a0cb30-e255-4853-bbad-29767b0b9aec	/dashboard	{"durationMs": 583}	\N	2026-09-16 06:03:59.582
cmu3p3nj6000d10yxgxbk3hwo	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	32a0cb30-e255-4853-bbad-29767b0b9aec	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 06:03:59.586
cmu3p3qww000e10yxfr0q34uw	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	32a0cb30-e255-4853-bbad-29767b0b9aec	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4379}	\N	2026-09-16 06:04:03.966
cmu3sw526000012idm4n4a6sl	PAGE_LEAVE	\N	\N	648b18d0-43c2-4f37-8f3a-5612def2f013	/	{"durationMs": 144465}	\N	2026-09-16 07:50:07.516
cmu3sx7v5000112id828dtph8	PAGE_LEAVE	\N	\N	648b18d0-43c2-4f37-8f3a-5612def2f013	/	{"durationMs": 1803}	\N	2026-09-16 07:50:57.808
cmu3sxaer000212idlswlpd6d	PAGE_LEAVE	\N	\N	648b18d0-43c2-4f37-8f3a-5612def2f013	/	{"durationMs": 1768}	\N	2026-09-16 07:51:01.108
cmu3sxaf4000312idudjpz32u	PAGE_VIEW	\N	\N	648b18d0-43c2-4f37-8f3a-5612def2f013	/auth/login	\N	\N	2026-09-16 07:51:01.121
cmu3sxf2k0000srherrp41r2l	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	648b18d0-43c2-4f37-8f3a-5612def2f013	/auth/login	{"durationMs": 6041}	\N	2026-09-16 07:51:07.149
cmu3sxfhy0001srhekt28t00p	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	648b18d0-43c2-4f37-8f3a-5612def2f013	/auth/login	{"durationMs": 487}	\N	2026-09-16 07:51:07.702
cmu3sxfhz000412idtodpffwp	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	648b18d0-43c2-4f37-8f3a-5612def2f013	/dashboard	\N	\N	2026-09-16 07:51:07.704
cmu3sxg8d000512id5hai0xoc	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	648b18d0-43c2-4f37-8f3a-5612def2f013	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 07:51:08.653
cmu3sxg8d0002srhennz9rqy7	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	648b18d0-43c2-4f37-8f3a-5612def2f013	/dashboard	{"durationMs": 995}	\N	2026-09-16 07:51:08.653
cmu3t2c1y0000siakvlgi4ubu	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	648b18d0-43c2-4f37-8f3a-5612def2f013	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4303}	\N	2026-09-16 07:54:56.518
cmu3uie5c00006rr1i18r137i	PAGE_LEAVE	\N	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/	{"durationMs": 1650}	\N	2026-09-16 08:35:25.344
cmu3uie6f000013jqcojdyobi	PAGE_VIEW	\N	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/auth/login	\N	\N	2026-09-16 08:35:25.383
cmu3uiikl000113jqndkijmpt	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/dashboard	\N	\N	2026-09-16 08:35:31.077
cmu3uiiko00016rr1x27g039z	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/auth/login	{"durationMs": 5692}	\N	2026-09-16 08:35:31.081
cmu3uiiso000213jqo4q7u6v4	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-16 08:35:31.369
cmu3uiita0000wibkiaqi7do8	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/dashboard	{"durationMs": 320}	\N	2026-09-16 08:35:31.39
cmu3uim0e0001wibk5xwhwsb4	PAGE_LEAVE	\N	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 4203}	\N	2026-09-16 08:35:35.535
cmu3uim0n0000107tovh3scu6	PAGE_VIEW	\N	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/	\N	\N	2026-09-16 08:35:35.544
cmu3uino40001107taqlmqezr	PAGE_LEAVE	\N	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/	{"durationMs": 2120}	\N	2026-09-16 08:35:37.684
cmu3uinon0002wibkoxbxpjhp	PAGE_VIEW	\N	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/auth/login	\N	\N	2026-09-16 08:35:37.704
cmu3uitb500009zbc6h5kj341	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/auth/login	{"durationMs": 7262}	\N	2026-09-16 08:35:44.993
cmu3uitb60000dibl25217gdo	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/dashboard	\N	\N	2026-09-16 08:35:44.995
cmu3uitpr0001diblf32k6on3	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 08:35:45.52
cmu3uitqc0002dibl8nvjd9b1	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/dashboard	{"durationMs": 577}	\N	2026-09-16 08:35:45.541
cmu3uiu9m00019zbchigwpmqe	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/dashboard	\N	\N	2026-09-16 08:35:46.234
cmu3uiu9r0003diblourkn3tr	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 707}	\N	2026-09-16 08:35:46.24
cmu3uiuhn0004dibl5w6fhepl	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/dashboard	{"durationMs": 285}	\N	2026-09-16 08:35:46.524
cmu3uiuhz00029zbcdd5ruqih	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 08:35:46.535
cmu3uj57q00039zbcpr53a6qh	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060/edit	\N	\N	2026-09-16 08:36:00.421
cmu3uj5820005diblguulwr5b	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 13895}	\N	2026-09-16 08:36:00.433
cmu3uj8ri0006dibl6gyn6hh2	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 08:36:05.022
cmu3uj8sj00049zbcaj9ed9us	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060/edit	{"durationMs": 4622}	\N	2026-09-16 08:36:05.059
cmu3ujji000059zbcbs10l6i8	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	5d81101e-3966-4da8-a2b6-30a7ec22214d	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 13910}	\N	2026-09-16 08:36:18.936
cmu3uuxeg000061x9shyil2ow	PAGE_VIEW	\N	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/auth/login	\N	\N	2026-09-16 08:45:10.166
cmu3uuykk0000u6ign4asgz5c	PAGE_LEAVE	\N	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 29172}	\N	2026-09-16 08:45:11.398
cmud1hos90002dva990kap7hd	PAGE_VIEW	\N	\N	a69f72e8-d89e-48c3-924c-26de0d29e517	/auth/login	\N	\N	2026-09-22 19:00:45.37
cmu3uuz4o000161x98tybndun	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/dashboard	\N	\N	2026-09-16 08:45:12.408
cmu3uuzj4000261x9thrv5i7f	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/dashboard	{"durationMs": 561}	\N	2026-09-16 08:45:12.928
cmu3uuzjn000361x927a1ewno	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 08:45:12.947
cmu3uv1qa000461x9zoa8lt15	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2849}	\N	2026-09-16 08:45:15.779
cmu3uv1wx000561x9d2yexu8g	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 08:45:16.018
cmv4qiyc40008c30ys5dhn2gm	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog	{"durationMs": 1232}	\N	2026-10-12 04:11:21.557
cmv4qj42o0009c30yjsvwq2yn	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog	{"durationMs": 7248}	\N	2026-10-12 04:11:28.992
cmv4qj523000ac30y5dudoix8	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	\N	\N	2026-10-12 04:11:30.267
cmv4qmyiq000ec30yrbysrn5w	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/qa-20261012-mv4nq083-blog-luu-nhap	{"durationMs": 49884}	\N	2026-10-12 04:14:28.418
cmu3uuz4n0001u6ig6wv669bk	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/auth/login	{"durationMs": 12706}	\N	2026-09-16 08:45:12.407
cmu3uv1q60002u6iggfzdw6to	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/dashboard	\N	\N	2026-09-16 08:45:15.774
cmu3uv1x40003u6igox2ao7mx	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/dashboard	{"durationMs": 253}	\N	2026-09-16 08:45:16.024
cmu3uv40u0004u6ig4gnljxf7	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2685}	\N	2026-09-16 08:45:18.751
cmu3uygpz0005u6igpdd7rta0	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-16 08:47:55.175
cmu3uyi0w0006u6igd22lo02u	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	\N	\N	2026-09-16 08:47:56.863
cmu3uyi1a000012sna3uc2gir	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1688}	\N	2026-09-16 08:47:56.877
cmu3uymrg000112snw1c87q2p	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 6145}	\N	2026-09-16 08:48:03.004
cmu3uyp0z0007u6ighyq4qiop	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 1897}	\N	2026-09-16 08:48:05.939
cmu3v18va000212sn855m8obb	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 77150}	\N	2026-09-16 08:50:04.965
cmu3v2wq7000312sntyxb7zf0	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 26152}	\N	2026-09-16 08:51:22.543
cmu6qnqo20000t9okeuy0hab6	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 3608}	\N	2026-09-18 09:10:54.914
cmu6qo5t70001t9okj7huw04p	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 6384}	\N	2026-09-18 09:11:14.539
cmu6qppur00008glh5acdgl9z	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 713}	\N	2026-09-18 09:12:27.172
cmu6s0w2500018glh4j65jxsl	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 1151}	\N	2026-09-18 09:49:08.045
cmu6s0xpt0000r5conrjhdz54	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 1308}	\N	2026-09-18 09:49:10.193
cmu6s1h3n00028glh5be28fp2	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 480}	\N	2026-09-18 09:49:35.316
cmu6s4drt00038glh7ptcd835	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 515}	\N	2026-09-18 09:51:50.97
cmu6tkkui00048glhi3nxgq27	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 1505}	\N	2026-09-18 10:32:26.251
cmu6usm860000p5q7wfb28zgp	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 1977}	\N	2026-09-18 11:06:40.903
cmu6xumxb0001p5q7h06ilqtq	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 2322}	\N	2026-09-18 12:32:13.968
cmu6y1qy70000kz42cmj2pimc	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 999}	\N	2026-09-18 12:37:45.775
cmu835kmu00001xudq6lwtv1j	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 2298}	\N	2026-09-19 07:48:28.471
cmu83k4lb0000amz9nyf3n0ac	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 1307}	\N	2026-09-19 07:59:47.519
cmu898ouz0000zppcgs0pxleo	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 3556}	\N	2026-09-19 10:38:51.612
cmu898ov30000137klty5uua2	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	e671abd5-2297-4fa6-9df3-43a61da3d044	/	{"durationMs": 0}	\N	2026-09-19 10:38:51.614
cmu8bib730000wq2kwaq36pmc	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ad0f3c9e-185b-4574-8921-2d376dc0aca4	/	{"durationMs": 3176}	\N	2026-09-19 11:42:19.695
cmu8bib7g00003qgv55v8977c	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ad0f3c9e-185b-4574-8921-2d376dc0aca4	/dashboard	\N	\N	2026-09-19 11:42:19.709
cmu8bibjg0001wq2kx3r3dmyk	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ad0f3c9e-185b-4574-8921-2d376dc0aca4	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-19 11:42:20.141
cmu8bibjv00013qgvl3f5366b	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ad0f3c9e-185b-4574-8921-2d376dc0aca4	/dashboard	{"durationMs": 468}	\N	2026-09-19 11:42:20.155
cmu8bicpi0002wq2k6toz3fo4	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	ad0f3c9e-185b-4574-8921-2d376dc0aca4	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1459}	\N	2026-09-19 11:42:21.655
cmuarc1xu0000117w2sy6059c	PAGE_VIEW	\N	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/auth/login	\N	\N	2026-09-21 04:40:53.967
cmuarc1yi0001117w1bp3z1oz	PAGE_LEAVE	\N	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 47077}	\N	2026-09-21 04:40:53.967
cmuarc2wo0002117wzc0uhble	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/auth/login	{"durationMs": 6317}	\N	2026-09-21 04:40:55.224
cmuarc2x00000xw07cm50cvwo	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/dashboard	\N	\N	2026-09-21 04:40:55.236
cmuarc3650001xw07j417gtko	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	\N	2026-09-21 04:40:55.565
cmuarc36o0002xw079i6cflb0	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/dashboard	{"durationMs": 435}	\N	2026-09-21 04:40:55.585
cmuarc7ia0003xw07rtqtlpxa	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/upgrade	\N	\N	2026-09-21 04:41:01.187
cmuarc7ib0003117wtameyzpi	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/f88cb919-d8c3-412f-8996-0f74ee3ea443	{"durationMs": 5632}	\N	2026-09-21 04:41:01.187
cmuarcn3v0004117wg5j2xh1j	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/upgrade	{"durationMs": 20139}	\N	2026-09-21 04:41:21.404
cmuare42b0004xw075h9d9pvu	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/upgrade	{"durationMs": 11499}	\N	2026-09-21 04:42:30.036
cmuare42n0005117wchhawih6	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	\N	\N	2026-09-21 04:42:30.046
cmuarel390006117wf79x560j	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 0}	\N	2026-09-21 04:42:52.101
cmv4qkqth0001sr3abd87yb7o	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	{"durationMs": 74636}	\N	2026-10-12 04:12:45.126
cmv4qlcdy0002sr3a5q0onpsg	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/qa-20261012-mv4nq083-blog-luu-nhap	\N	\N	2026-10-12 04:13:13.076
cmv4qmykz0003sr3a8b51bpqi	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog	\N	\N	2026-10-12 04:14:28.5
cmuarel3l0005xw07eq7v8t3a	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 22107}	\N	2026-09-21 04:42:52.11
cmuarelok0000g95qu9s022by	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	\N	\N	2026-09-21 04:42:52.73
cmuaretpl0001g95qxtvagni3	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 10961}	\N	2026-09-21 04:43:03.274
cmuarexmy0006xw07sqbzcd8d	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 4868}	\N	2026-09-21 04:43:08.361
cmuarf01u0007xw07hz6ba6b5	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	\N	\N	2026-09-21 04:43:11.49
cmuarf2s70008xw07glrnblkg	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/campaigns/mam-xanh-hoc-duong-mt18obvz	\N	\N	2026-09-21 04:43:15.032
cmuarfnqu0004g95qsz1ubqng	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 27169}	\N	2026-09-21 04:43:42.198
cmuarfnrx0005g95qduevm8eg	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-21 04:43:42.237
cmuarfqyt0006g95qb4mb83uo	PAGE_LEAVE	\N	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 4220}	\N	2026-09-21 04:43:46.374
cmuarfqyu0009xw07s85a8924	PAGE_VIEW	\N	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	\N	\N	2026-09-21 04:43:46.374
cmuarfs1g000axw07o1kemmem	PAGE_LEAVE	\N	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 1356}	\N	2026-09-21 04:43:47.764
cmuarfs1n0007g95qztos2186	PAGE_VIEW	\N	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/auth/login	\N	\N	2026-09-21 04:43:47.771
cmuarfwxw000bxw07z8ntrt3h	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/dashboard	\N	\N	2026-09-21 04:43:54.116
cmuarfx5v000cxw07jnv55hn0	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-21 04:43:54.404
cmuarfx7y000dxw07690nohy4	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/dashboard	{"durationMs": 342}	\N	2026-09-21 04:43:54.478
cmuarg194000exw07e453b6gq	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 5306}	\N	2026-09-21 04:43:59.703
cmuarg79y000fxw07csl3akj5	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/campaigns/mam-xanh-hoc-duong-mt18obvz	\N	\N	2026-09-21 04:44:07.511
cmuargccd000gxw074rokcryi	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 6578}	\N	2026-09-21 04:44:14.077
cmuargcdx000hxw07glwbd9uz	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-21 04:44:14.133
cmuargegc000ixw078423ftqy	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 2756}	\N	2026-09-21 04:44:16.81
cmuargeh5000jxw07r98ru4do	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/cmphnhw8e0002so1uh16dwpvn/edit	\N	\N	2026-09-21 04:44:16.841
cmuarggho000kxw07avcuz683	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/cmphnhw8e0002so1uh16dwpvn/edit	{"durationMs": 2619}	\N	2026-09-21 04:44:19.453
cmuargjhx000lxw07gp4a5s1e	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 3317}	\N	2026-09-21 04:44:23.349
cmuarhdb3000mxw078auwsr5f	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/dashboard/creator/edit/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 38648}	\N	2026-09-21 04:45:01.982
cmuarhfnp000nxw071jxcuas7	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	\N	\N	2026-09-21 04:45:05.029
cmuarhg1t000oxw079tw9m327	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/dashboard/creator	{"durationMs": 3033}	\N	2026-09-21 04:45:05.538
cmv4qkt3t0000xsrw4ti4y8q7	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/hanh-trinh-mam-xanh-tu-te	\N	\N	2026-10-12 04:12:48.09
cmv4qlhfy0001xsrw3rw0hohs	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/qa-20261012-mv4nq083-blog-luu-nhap	{"durationMs": 6552}	\N	2026-10-12 04:13:19.63
cmv4qo0j10002xsrwftlfd00m	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog	{"durationMs": 49188}	\N	2026-10-12 04:15:17.676
cmv4qo1g80003xsrw4k0pfrmm	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/editor	\N	\N	2026-10-12 04:15:18.873
cmuaretoi0007117w88df3uc1	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 0}	\N	2026-09-21 04:43:03.235
cmuaretu60008117wxcy0d0zn	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	\N	\N	2026-09-21 04:43:03.439
cmuarexmt0009117wcuvqbk02	PAGE_VIEW	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/projects	\N	\N	2026-09-21 04:43:08.355
cmuarf01o0002g95qstjzwyvg	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/projects	{"durationMs": 3167}	\N	2026-09-21 04:43:11.485
cmuarf2sa0003g95q9urh17hn	PAGE_LEAVE	f88cb919-d8c3-412f-8996-0f74ee3ea443	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 3531}	\N	2026-09-21 04:43:15.034
cmuarfwxq0008g95qfir2m69e	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/auth/login	{"durationMs": 6286}	\N	2026-09-21 04:43:54.111
cmuarg1960009g95qu55bn6f9	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	\N	\N	2026-09-21 04:43:59.706
cmuarg79l000ag95qkutq1c04	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 7800}	\N	2026-09-21 04:44:07.498
cmuargghz000bg95qy0jbz6me	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-21 04:44:19.462
cmuarggxg000cg95q47wu3zq7	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 573}	\N	2026-09-21 04:44:20.02
cmuarggy2000dg95q6gmvqchm	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/campaigns/mam-xanh-hoc-duong-mt18obvz	\N	\N	2026-09-21 04:44:20.042
cmuargjhz000eg95q2t0rxpy7	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/dashboard/creator/edit/mam-xanh-hoc-duong-mt18obvz	\N	\N	2026-09-21 04:44:23.351
cmuarhdap000fg95qz0pi07pu	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/dashboard/creator	\N	\N	2026-09-21 04:45:01.97
cmuarhold000gg95qwmzd1rl0	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/projects	\N	\N	2026-09-21 04:45:16.608
cmuarhon6000a117wlzm2pd15	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 11584}	\N	2026-09-21 04:45:16.667
cmuari2bq000b117wognl08ez	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/projects	{"durationMs": 17720}	\N	2026-09-21 04:45:34.405
cmuari2ci000pxw07m4dg2t6j	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	\N	\N	2026-09-21 04:45:34.435
cmuari4kz000qxw079yt9zewa	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 2946}	\N	2026-09-21 04:45:37.331
cmuarlo8k000c117wy7f5rc4h	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 132733}	\N	2026-09-21 04:48:22.772
cmuarmehr000rxw07q3s60gga	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 18914}	\N	2026-09-21 04:48:56.799
cmuasoduw0000135qhomlae9o	PAGE_VIEW	\N	\N	9a3722f6-b810-40b2-b9a8-cd73e2b493ff	/	\N	\N	2026-09-21 05:18:28.905
cmuasodxr000044pr7ibp1w5x	PAGE_VIEW	\N	\N	4b51738a-6ea9-4f94-bce8-f2102283b5dd	/	\N	\N	2026-09-21 05:18:29.007
cmuasoe0j0000rrtkw4bc4a28	PAGE_VIEW	\N	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/	\N	\N	2026-09-21 05:18:29.104
cmuasrylq0000wr6xfc9u5rs9	PAGE_LEAVE	\N	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/	{"durationMs": 167684}	\N	2026-09-21 05:21:15.756
cmuastpun0001wr6xggat9jvc	PAGE_VIEW	\N	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/auth/login	\N	\N	2026-09-21 05:22:37.725
cmuastpv00002wr6xziylebp0	PAGE_LEAVE	\N	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/	{"durationMs": 20817}	\N	2026-09-21 05:22:37.74
cmuastxwi0003wr6x4g8qxzsb	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/dashboard	\N	\N	2026-09-21 05:22:48.162
cmuastxww0000vl9eh5rm7fiy	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/auth/login	{"durationMs": 10368}	\N	2026-09-21 05:22:48.177
cmuastybp0004wr6x1gr1p61f	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/dashboard	{"durationMs": 606}	\N	2026-09-21 05:22:48.71
cmuastyc50005wr6x4new6oz0	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-21 05:22:48.725
cmuasu0ia0001vl9e72cn4490	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 2813}	\N	2026-09-21 05:22:51.538
cmuasu0ih0006wr6x5bnkezgm	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/	\N	\N	2026-09-21 05:22:51.545
cmuasu6660007wr6xqzqdzy3d	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/	{"durationMs": 7347}	\N	2026-09-21 05:22:58.876
cmuasvhcy000012wxlcjsbjib	PAGE_LEAVE	\N	\N	0ec47d8a-ec66-40fd-863a-d100a19d2f69	/	{"durationMs": 850}	\N	2026-09-21 05:24:00.034
cmuasvhvs0008wr6xlw0opbie	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/	{"durationMs": 690}	\N	2026-09-21 05:24:00.712
cmuasvhw80002vl9ezsu7taqr	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	e7859aa7-f1c4-4cb4-ae16-42d909d9e444	/	{"durationMs": 0}	\N	2026-09-21 05:24:00.729
cmuasvicp00005giskp7xl8pd	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 599}	\N	2026-09-21 05:24:01.321
cmuasvjxy000112wx99xdtju5	PAGE_LEAVE	\N	\N	0ec47d8a-ec66-40fd-863a-d100a19d2f69	/	{"durationMs": 1985}	\N	2026-09-21 05:24:03.381
cmuasvmc300015gisd7oo86xe	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 0}	\N	2026-09-21 05:24:06.483
cmuaswgxe0000vmclj894zlhx	PAGE_VIEW	\N	\N	e43ae3c3-be00-421f-bc03-2b51c0742680	/	\N	\N	2026-09-21 05:24:46.13
cmuasxafh0001vmclxmr6vhm6	PAGE_LEAVE	\N	\N	e43ae3c3-be00-421f-bc03-2b51c0742680	/	{"durationMs": 38282}	\N	2026-09-21 05:25:24.363
cmuat0i950002vmclnm5ruf0c	PAGE_LEAVE	\N	\N	e43ae3c3-be00-421f-bc03-2b51c0742680	/	{"durationMs": 1058}	\N	2026-09-21 05:27:54.474
cmuat0n770003vmclt0wszg3y	PAGE_VIEW	\N	\N	7ab900bb-b75a-444d-825b-61d56179b585	/	\N	\N	2026-09-21 05:28:00.883
cmuat0n950004vmcll2my13jp	PAGE_VIEW	\N	\N	1d2232a8-f3c7-4418-bef2-6db8662e8cc9	/	\N	\N	2026-09-21 05:28:00.953
cmuat0nbh00008lvv33qrj903	PAGE_LEAVE	\N	\N	e43ae3c3-be00-421f-bc03-2b51c0742680	/	{"durationMs": 27478}	\N	2026-09-21 05:28:01.034
cmuat0sx000004jwqr8hmpjpp	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	cfd1aa49-f310-4d76-97e2-12d47bb5b54a	/	\N	\N	2026-09-21 05:28:08.29
cmuat0xrk0000t2htp9cvcfbe	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	cfd1aa49-f310-4d76-97e2-12d47bb5b54a	/	{"durationMs": 6321}	\N	2026-09-21 05:28:14.577
cmuat0yo10001t2htnatgkdx0	PAGE_LEAVE	\N	\N	e43ae3c3-be00-421f-bc03-2b51c0742680	/	{"durationMs": 1220}	\N	2026-09-21 05:28:15.746
cmuasvmck000012bs6iomeite	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	5f6c0b5e-9a15-4075-8495-abb7f2f7f2a6	/	{"durationMs": 3128}	\N	2026-09-21 05:24:06.5
cmuatepao0000zcc8tlsn3kie	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	cfd1aa49-f310-4d76-97e2-12d47bb5b54a	/	{"durationMs": 815}	\N	2026-09-21 05:38:56.784
cmuatfcdf0002t2hthkqux1sj	PAGE_LEAVE	\N	\N	e43ae3c3-be00-421f-bc03-2b51c0742680	/	{"durationMs": 2558}	\N	2026-09-21 05:39:23.122
cmuatg6dx000012zer9ztsl8p	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	e16a3cad-4089-4c25-9b7a-a35010fee630	/	{"durationMs": 0}	\N	2026-09-21 05:40:05.589
cmuatg6h60000hxa95zjmwe86	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	e16a3cad-4089-4c25-9b7a-a35010fee630	/	{"durationMs": 707}	\N	2026-09-21 05:40:05.675
cmuatgttd0000n5ip31ihyaef	PAGE_VIEW	\N	\N	5e791c01-bfce-47d9-9bb1-4da9bc1b1b90	/	\N	\N	2026-09-21 05:40:35.952
cmuatgtvl0000gwhf332f5ili	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	e16a3cad-4089-4c25-9b7a-a35010fee630	/	\N	\N	2026-09-21 05:40:36.029
cmuatgrij0003t2htcqsu6w3b	PAGE_LEAVE	\N	\N	e43ae3c3-be00-421f-bc03-2b51c0742680	/	{"durationMs": 699}	\N	2026-09-21 05:40:32.969
cmuatj3mg0000suvqozso1ms2	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	cfd1aa49-f310-4d76-97e2-12d47bb5b54a	/	{"durationMs": 614}	\N	2026-09-21 05:42:21.977
cmuatko2z0001gwhfydpallgr	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	cfd1aa49-f310-4d76-97e2-12d47bb5b54a	/	{"durationMs": 1523}	\N	2026-09-21 05:43:35.148
cmuau69ap00001uv3zvikt9bm	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	cfd1aa49-f310-4d76-97e2-12d47bb5b54a	/	{"durationMs": 519}	\N	2026-09-21 06:00:22.417
cmuau69ar0002gwhfaci0u14r	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	cfd1aa49-f310-4d76-97e2-12d47bb5b54a	/	{"durationMs": 0}	\N	2026-09-21 06:00:22.419
cmuau6j2q00011uv3za9d6j8j	PAGE_VIEW	\N	\N	52e68bd4-8819-4e75-bc03-e8d9d7fe941c	/	\N	\N	2026-09-21 06:00:34.819
cmuau6np900021uv3kvwjndl3	PAGE_LEAVE	\N	\N	52e68bd4-8819-4e75-bc03-e8d9d7fe941c	/	{"durationMs": 6246}	\N	2026-09-21 06:00:41.085
cmuau7hvx00031uv3kg610yvz	PAGE_LEAVE	\N	\N	52e68bd4-8819-4e75-bc03-e8d9d7fe941c	/	{"durationMs": 1312}	\N	2026-09-21 06:01:20.204
cmuau85qz00041uv3d5w4m63y	PAGE_LEAVE	\N	\N	52e68bd4-8819-4e75-bc03-e8d9d7fe941c	/	{"durationMs": 1816}	\N	2026-09-21 06:01:51.13
cmuau9ebk00051uv35adfmk96	PAGE_LEAVE	\N	\N	52e68bd4-8819-4e75-bc03-e8d9d7fe941c	/	{"durationMs": 5583}	\N	2026-09-21 06:02:48.894
cmuay3cq70000tf0h6duvmb94	PAGE_VIEW	\N	\N	d2b89318-f6d0-4010-b349-de3855c661a5	/campaigns/mam-xanh-hoc-duong-mt18obvz	\N	\N	2026-09-21 07:50:05.357
cmuay3cow0000snkip67pu78n	PAGE_LEAVE	\N	\N	d2b89318-f6d0-4010-b349-de3855c661a5	/	{"durationMs": 19240}	\N	2026-09-21 07:50:05.31
cmuay7p500001tf0hx0dxz14v	PAGE_LEAVE	\N	\N	d2b89318-f6d0-4010-b349-de3855c661a5	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 202734}	\N	2026-09-21 07:53:28.067
cmuaz0cmi0000wo6sl7nw0eb4	PAGE_LEAVE	\N	\N	aef60383-8651-4809-be76-2e772a3b5157	/	{"durationMs": 3206}	\N	2026-09-21 08:15:44.874
cmuazzz0b000010q3r4icyvis	PAGE_LEAVE	\N	\N	d2b89318-f6d0-4010-b349-de3855c661a5	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 5120}	\N	2026-09-21 08:43:26.841
cmuazzz18000110q3v017j9fe	PAGE_LEAVE	\N	\N	d2b89318-f6d0-4010-b349-de3855c661a5	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 1293}	\N	2026-09-21 08:43:26.841
cmuc5rvao0000vd8h40h7q9au	PAGE_LEAVE	\N	\N	d2b89318-f6d0-4010-b349-de3855c661a5	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 26659}	\N	2026-09-22 04:12:52.654
cmuc5t7l80001vd8hg63qw52o	PAGE_LEAVE	\N	\N	d2b89318-f6d0-4010-b349-de3855c661a5	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 1554}	\N	2026-09-22 04:13:55.243
cmuc5tfns0002vd8hxqqd213y	PAGE_LEAVE	\N	\N	d2b89318-f6d0-4010-b349-de3855c661a5	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 1203}	\N	2026-09-22 04:14:05.704
cmuc8iw250000kt61afdc81b0	PAGE_LEAVE	\N	\N	d2b89318-f6d0-4010-b349-de3855c661a5	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 1305}	\N	2026-09-22 05:29:52.587
cmucm9fvo0000s9ag6jghnesd	PAGE_VIEW	\N	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/auth/login	\N	\N	2026-09-22 11:54:26.338
cmucm9gy70001s9agj4wge1e5	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/auth/login	{"durationMs": 5399}	\N	2026-09-22 11:54:27.728
cmucm9h9m0002s9ag18kjmiev	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 11:54:28.138
cmucm9k310000u544m3bfc7rr	PAGE_VIEW	\N	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/	\N	\N	2026-09-22 11:54:31.789
cmucm9k3k0001u544wkbl48hp	PAGE_LEAVE	\N	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 3646}	\N	2026-09-22 11:54:31.809
cmucm9ldt0002u544ygqb8ebw	PAGE_LEAVE	\N	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/	{"durationMs": 1642}	\N	2026-09-22 11:54:33.473
cmucm9li00003u544jxh65r8s	PAGE_VIEW	\N	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/auth/login	\N	\N	2026-09-22 11:54:33.624
cmucm9pjf0004u544cfxc0xyj	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/dashboard	\N	\N	2026-09-22 11:54:38.859
cmucm9pjf00003jypbhf3cq6j	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/auth/login	{"durationMs": 5360}	\N	2026-09-22 11:54:38.86
cmucm9prk0005u544s9vcls60	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-22 11:54:39.153
cmucm9ps60006u544lzs4sudj	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/dashboard	{"durationMs": 369}	\N	2026-09-22 11:54:39.175
cmucm9rlo00013jypnzsh5a56	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2388}	\N	2026-09-22 11:54:41.532
cmucm9rm20007u544izrivvlq	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/dashboard	\N	\N	2026-09-22 11:54:41.547
cmucm9rup0008u5448f9c3ndz	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-22 11:54:41.857
cmucm9rva0009u544uhgophmi	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/dashboard	{"durationMs": 333}	\N	2026-09-22 11:54:41.879
cmucm9zwm000au544wgmk9du3	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4508}	\N	2026-09-22 11:54:46.416
cmud1hnhn00002zuk35e1k2mr	PAGE_VIEW	\N	\N	a69f72e8-d89e-48c3-924c-26de0d29e517	/auth/login	\N	\N	2026-09-22 19:00:43.689
cmud1hngh0000dva9wb63sj7y	PAGE_LEAVE	\N	\N	a69f72e8-d89e-48c3-924c-26de0d29e517	/	{"durationMs": 3411}	\N	2026-09-22 19:00:43.649
cmud1hoi500012zukgddkocbs	PAGE_LEAVE	\N	\N	a69f72e8-d89e-48c3-924c-26de0d29e517	/auth/login	{"durationMs": 1395}	\N	2026-09-22 19:00:45.005
cmud1hoi60001dva97njyrft5	PAGE_VIEW	\N	\N	a69f72e8-d89e-48c3-924c-26de0d29e517	/campaigns/create	\N	\N	2026-09-22 19:00:45.006
cmud1hosd00022zuknufpfb6m	PAGE_LEAVE	\N	\N	a69f72e8-d89e-48c3-924c-26de0d29e517	/campaigns/create	{"durationMs": 373}	\N	2026-09-22 19:00:45.373
cmud1i38x00032zuk9q9tx8v5	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a69f72e8-d89e-48c3-924c-26de0d29e517	/campaigns/create	\N	\N	2026-09-22 19:01:04.113
cmud1j66e0000m1mmn99ekqd1	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a69f72e8-d89e-48c3-924c-26de0d29e517	/campaigns/create	{"durationMs": 50485}	\N	2026-09-22 19:01:54.565
cmud1j66y0001m1mmeojwhbc8	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a69f72e8-d89e-48c3-924c-26de0d29e517	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-22 19:01:54.586
cmud1j8fc0000ty98tfaldvog	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	a69f72e8-d89e-48c3-924c-26de0d29e517	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2872}	\N	2026-09-22 19:01:57.481
cmud1ojdx0000gt7z9te1jma7	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1478}	\N	2026-09-22 19:06:04.965
cmud1okp90001gt7zpyqfexeq	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-22 19:06:06.669
cmud1oi8o0000uuj1wv33ufqt	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-22 19:06:03.48
cmud1omlb0002gt7z4gergsm7	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2476}	\N	2026-09-22 19:06:09.12
cmud1omlf0001uuj14aonfrq7	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/	\N	\N	2026-09-22 19:06:09.124
cmud1osfy0003gt7zx9ep46gc	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/campaigns	\N	\N	2026-09-22 19:06:16.702
cmud1ou0m0002uuj1blxjltop	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/	{"durationMs": 7544}	\N	2026-09-22 19:06:16.699
cmud1ou0w0003uuj1uoc3x65a	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/campaigns	{"durationMs": 2107}	\N	2026-09-22 19:06:18.753
cmud1ou3f0004gt7zx5hvfbna	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/campaigns/album-mam-sang-1787564107725-3c1kg	\N	\N	2026-09-22 19:06:18.844
cmud1q2sd0004uuj1iqeogpye	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 57991}	\N	2026-09-22 19:07:16.763
cmud1rfa20005gt7zm6esay1j	PAGE_VIEW	\N	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/	\N	\N	2026-09-22 19:08:19.609
cmud1rf9s0005uuj1ozljpogy	PAGE_LEAVE	\N	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 5852}	\N	2026-09-22 19:08:19.6
cmud1rgtd0006gt7zt6fjy2s7	PAGE_VIEW	\N	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/auth/login	\N	\N	2026-09-22 19:08:21.601
cmud1rgth0006uuj19j3tob75	PAGE_LEAVE	\N	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/	{"durationMs": 2002}	\N	2026-09-22 19:08:21.606
cmud1rlke0007uuj16evqzst2	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/dashboard	\N	\N	2026-09-22 19:08:27.758
cmud1rlkl0007gt7za9zybhu3	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/auth/login	{"durationMs": 6055}	\N	2026-09-22 19:08:27.766
cmud1rlsc0008uuj1lydr6otf	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/dashboard	{"durationMs": 392}	\N	2026-09-22 19:08:28.045
cmud1roxq0000rf045tjkara9	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 19:08:32.124
cmud1rsj50009uuj1v5ogwhr1	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 8738}	\N	2026-09-22 19:08:36.786
cmud1rsjg0001rf04rhorqvpt	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	\N	\N	2026-09-22 19:08:36.797
cmud1ruid0002rf04o2sdbhn9	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 2565}	\N	2026-09-22 19:08:39.35
cmud1ruif000auuj11i7na149	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 19:08:39.352
cmud1rwnl000buuj1lkcuqbya	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 2735}	\N	2026-09-22 19:08:42.13
cmud1rwnm0003rf04ni8m3jwq	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/projects/cmt71ij030009y4v24x3m6vo0	\N	\N	2026-09-22 19:08:42.13
cmud1seu40004rf04c7sj4hv1	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 23581}	\N	2026-09-22 19:09:05.693
cmud1smfl000cuuj1my4ms166	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 2554}	\N	2026-09-22 19:09:15.537
cmud1smgo000duuj13qbctu93	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/gioi-thieu	\N	\N	2026-09-22 19:09:15.576
cmud1spqi000euuj1cl2r26wv	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/gioi-thieu	{"durationMs": 4224}	\N	2026-09-22 19:09:19.818
cmud1spqs0005rf04z5zzkfn6	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/dashboard	\N	\N	2026-09-22 19:09:19.827
cmud1spzq0006rf044hkazzxz	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 19:09:20.15
cmud1spzy000fuuj1na6wut7x	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/dashboard	{"durationMs": 394}	\N	2026-09-22 19:09:20.159
cmud1sun2000guuj1pvzer4m6	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/products/5126c0a1-063f-4047-b44f-cd3aa156d1de	\N	\N	2026-09-22 19:09:26.174
cmud1suob000huuj11qh2mb4t	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 6012}	\N	2026-09-22 19:09:26.219
cmud1tk9z000iuuj1kqd2zqcw	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/products/5126c0a1-063f-4047-b44f-cd3aa156d1de	{"durationMs": 33209}	\N	2026-09-22 19:09:59.399
cmud2f25700009hqyzzafemmr	PAGE_VIEW	\N	\N	34d24532-45de-439c-9257-52b71efd779f	/campaigns/create	\N	\N	2026-09-22 19:26:42.332
cmud2f2bz0000s94162qgag5l	PAGE_LEAVE	\N	\N	34d24532-45de-439c-9257-52b71efd779f	/	{"durationMs": 1649}	\N	2026-09-22 19:26:42.573
cmud2f2e50001s941ui4od4jc	PAGE_LEAVE	\N	\N	34d24532-45de-439c-9257-52b71efd779f	/campaigns/create	{"durationMs": 327}	\N	2026-09-22 19:26:42.653
cmud2f2ek00019hqyc3yof58y	PAGE_VIEW	\N	\N	34d24532-45de-439c-9257-52b71efd779f	/auth/login	\N	\N	2026-09-22 19:26:42.669
cmud2fjwa0000rfqyio638yet	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/campaigns/create	\N	\N	2026-09-22 19:27:05.338
cmud2fjx50000z9punx1hr5rh	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/auth/login	{"durationMs": 22655}	\N	2026-09-22 19:27:05.369
cmud2fudr0001z9puxxkh72wt	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/campaigns/create	{"durationMs": 13582}	\N	2026-09-22 19:27:18.927
cmud2fudw0001rfqyw2t9cuii	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/	\N	\N	2026-09-22 19:27:18.933
cmud2fwbk0002z9pugjnj8j3a	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/	{"durationMs": 2545}	\N	2026-09-22 19:27:21.438
cmud2fwcs0003z9pucim35mym	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 19:27:21.484
cmud2g1mk0004z9pujlryd24o	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 6877}	\N	2026-09-22 19:27:28.317
cmud2g1ml0002rfqyozzc01s7	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/projects/cmt71ij030009y4v24x3m6vo0	\N	\N	2026-09-22 19:27:28.317
cmud2g40b0005z9pu92k3f5hs	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 3092}	\N	2026-09-22 19:27:31.404
cmud2g41s0003rfqyxrhlrm6j	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 19:27:31.456
cmud2gb7a0004rfqyp9is2wuk	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 9347}	\N	2026-09-22 19:27:40.727
cmud2gb7z0006z9pub4mz6tc0	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	\N	\N	2026-09-22 19:27:40.75
cmud2ggd20005rfqyn22o8tjw	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 6625}	\N	2026-09-22 19:27:47.414
cmud2ggd40007z9puoljqujb0	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/notifications	\N	\N	2026-09-22 19:27:47.416
cmud2gk4f0006rfqyjw32dg8x	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/notifications	{"durationMs": 4903}	\N	2026-09-22 19:27:52.286
cmud2gk5d0000k6990275b58r	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	\N	\N	2026-09-22 19:27:52.321
cmud2gw1y0008z9puxcjkmcw2	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 19:28:07.748
cmud2gw230001k699ut0anz4c	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 15462}	\N	2026-09-22 19:28:07.756
cmud2h1nw0002k699snrh7ezf	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 7284}	\N	2026-09-22 19:28:15.02
cmud2h1nx0009z9pugdip84ko	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/edit/vuon-rau-khong-rac-thai-1787564108182-5kp00	\N	\N	2026-09-22 19:28:15.021
cmud2h3j9000az9puarv9cp0m	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 19:28:17.446
cmud2h3k5000bz9pu9tr35irn	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/edit/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 2411}	\N	2026-09-22 19:28:17.477
cmud2hpgu0003k699cmv99r2c	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator	\N	\N	2026-09-22 19:28:45.871
cmud2hphr0004k6990553uh8g	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 28451}	\N	2026-09-22 19:28:45.903
cmud2iggq000cz9pul05fnob6	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/statement/57bc2747-1432-4d52-b866-a9bcfdf19478	\N	\N	2026-09-22 19:29:20.857
cmud2ircv0005k699dkk0l2w0	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator	{"durationMs": 34955}	\N	2026-09-22 19:29:20.873
cmud2jen90006k699gob0a0r7	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/statement/57bc2747-1432-4d52-b866-a9bcfdf19478	{"durationMs": 41918}	\N	2026-09-22 19:30:02.87
cmud2n8df0007k699p8offhst	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/statement/57bc2747-1432-4d52-b866-a9bcfdf19478	{"durationMs": 1937}	\N	2026-09-22 19:33:03.651
cmud2zdh700003u202xjxn9uv	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/statement/57bc2747-1432-4d52-b866-a9bcfdf19478	{"durationMs": 3986}	\N	2026-09-22 19:42:30.14
cmud31mkh0000p3uw3520282j	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/statement/57bc2747-1432-4d52-b866-a9bcfdf19478	{"durationMs": 101116}	\N	2026-09-22 19:44:15.234
cmud34kt60001p3uwsr5fii72	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator	\N	\N	2026-09-22 19:46:32.922
cmud34kt900013u200canezqg	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/statement/57bc2747-1432-4d52-b866-a9bcfdf19478	{"durationMs": 6224}	\N	2026-09-22 19:46:32.925
cmv4nq7tf000avit7w8kyj86u	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/gioi-thieu	\N	\N	2026-10-12 02:53:01.588
cmud34rsd00023u20x71q3ebv	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator	{"durationMs": 9049}	\N	2026-09-22 19:46:41.965
cmud34rtl00033u202zqfqmy6	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/thue	\N	\N	2026-09-22 19:46:42.009
cmud3571o00043u209266hj7l	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/thue	{"durationMs": 19722}	\N	2026-09-22 19:47:01.74
cmud368t80002p3uwt5bjzqmm	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/thue	{"durationMs": 1829}	\N	2026-09-22 19:47:50.685
cmud3a8u20000pjuv5mto29hn	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard	\N	\N	2026-09-22 19:50:57.338
cmud3a8v60000w3pmzggdm80s	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard/creator/thue	{"durationMs": 4352}	\N	2026-09-22 19:50:57.378
cmud3a93j0001w3pm5mq2hst8	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 19:50:57.679
cmud3ahk20001pjuvbztfedut	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 10915}	\N	2026-09-22 19:51:08.642
cmud3a93n00053u207tu41ta6	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/dashboard	{"durationMs": 386}	\N	2026-09-22 19:50:57.684
cmud3am3e00063u20qcutmdpb	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	34d24532-45de-439c-9257-52b71efd779f	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 1333}	\N	2026-09-22 19:51:14.523
cmud3cwb60000dad60t3hvs52	PAGE_LEAVE	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/	{"durationMs": 11119}	\N	2026-09-22 19:53:01.075
cmud3cwhc0001dad66mpsxrb9	PAGE_VIEW	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/auth/login	\N	\N	2026-09-22 19:53:01.296
cmud3drsp0000lplytjkn5eu7	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/auth/login	{"durationMs": 40532}	\N	2026-09-22 19:53:41.882
cmud3ds090001lplyxawpvrby	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/dashboard	{"durationMs": 288}	\N	2026-09-22 19:53:42.153
cmud3ds0n0002lplyalyu99wd	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-22 19:53:42.168
cmud3dxzg00005elqwv0jailo	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/dashboard	\N	\N	2026-09-22 19:53:45.837
cmud3e06j0003lplyo90ofs1b	PAGE_VIEW	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/	\N	\N	2026-09-22 19:53:52.748
cmud3e06l00015elqe0lwtr53	PAGE_LEAVE	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 10641}	\N	2026-09-22 19:53:52.75
cmud3e4gx00025elqzb3r6rkd	PAGE_VIEW	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/auth/login	\N	\N	2026-09-22 19:53:58.305
cmud3e4gv0004lplyhpup75l9	PAGE_LEAVE	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/	{"durationMs": 5521}	\N	2026-09-22 19:53:58.302
cmud3ebx90005lplyszlvjpeg	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/auth/login	{"durationMs": 9632}	\N	2026-09-22 19:54:07.966
cmud3eby60006lply03qwlw1a	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/dashboard	\N	\N	2026-09-22 19:54:07.998
cmud3ec6i0007lplyl0u8f1uw	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 19:54:08.298
cmud3edf80000worw0k1sg1wi	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/dashboard	{"durationMs": 381}	\N	2026-09-22 19:54:09.906
cmud3egkm00035elqszrf3e0u	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 5699}	\N	2026-09-22 19:54:13.991
cmud3egkr0001worw5nvn8szx	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/blog/ban-nhap-ke-hoach-mua-thu-1787564122620-zc0fx	\N	\N	2026-09-22 19:54:13.995
cmud3emct00045elqtpeq459s	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 19:54:21.485
cmud3emdj0002worwax8nj2sh	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/blog/ban-nhap-ke-hoach-mua-thu-1787564122620-zc0fx	{"durationMs": 7467}	\N	2026-09-22 19:54:21.511
cmud3ep5w0003worwo1kcs8zb	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	\N	\N	2026-09-22 19:54:25.123
cmud3ep5y00055elqze3b4v54	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 3658}	\N	2026-09-22 19:54:25.125
cmud3f7ow00065elq9hozkie3	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 23941}	\N	2026-09-22 19:54:49.134
cmud3fdoj0004worw4nzod9n6	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 1268}	\N	2026-09-22 19:54:56.9
cmud3gcxh0005worw40pheycb	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 4842}	\N	2026-09-22 19:55:42.582
cmud3gv4b00075elqxlgawqnu	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 1302}	\N	2026-09-22 19:56:06.155
cmud3gv5500085elq6vanvipn	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 0}	\N	2026-09-22 19:56:06.185
cmud3gve900095elqqdnlsieb	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	\N	\N	2026-09-22 19:56:06.513
cmud3h4vp0008lplyrivx1alp	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 12158}	\N	2026-09-22 19:56:18.806
cmud3hc7a000a5elq6py9a6hc	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 6705}	\N	2026-09-22 19:56:28.295
cmud3quns000b5elqz060nd26	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 25049}	\N	2026-09-22 20:03:52.119
cmud3rx5h000c5elqpfcoqkpl	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 1373}	\N	2026-09-22 20:04:42.005
cmud3tx7p00005ig947703yp5	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 24590}	\N	2026-09-22 20:06:15.398
cmud3te4p000d5elqf0co0s69	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 20:05:50.664
cmud3te4i0006worwxt0aai70	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/projects/cmt71ij030009y4v24x3m6vo0	{"durationMs": 40118}	\N	2026-09-22 20:05:50.659
cmud3vwkw0007worwd2m6wsj7	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 1324}	\N	2026-09-22 20:07:47.888
cmud3x71r000e5elq9nzjo7xp	PAGE_LEAVE	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 4353}	\N	2026-09-22 20:08:48.111
cmud3xc8b0000xhvxo4vmljst	PAGE_VIEW	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/auth/login	\N	\N	2026-09-22 20:08:54.827
cmud3xk430001xhvxu2qylfx6	PAGE_LEAVE	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/auth/login	{"durationMs": 10155}	\N	2026-09-22 20:09:05.041
cmud3xysy0002xhvx8j7rzxsy	PAGE_LEAVE	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/auth/login	{"durationMs": 1240}	\N	2026-09-22 20:09:24.079
cmud3xc7t0008worw7h94lfdy	PAGE_LEAVE	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/	{"durationMs": 6661}	\N	2026-09-22 20:08:54.808
cmud3zmgy0003xhvx1ec6elpg	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/dashboard	\N	\N	2026-09-22 20:10:41.41
cmud3x72300015ig9a95ai81j	PAGE_VIEW	\N	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/	\N	\N	2026-09-22 20:08:48.121
cmud3zmh30009worwtxmvad4z	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/auth/login	{"durationMs": 17870}	\N	2026-09-22 20:10:41.413
cmud3zmq0000aworwz7ne5dju	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-22 20:10:41.736
cmv4qpn2x0004xsrwtpdkiivh	PAGE_VIEW	\N	\N	208e8c95-4eb0-4e87-8b9c-04e299d37859	/blog/qa-20261012-mv4nq083-blog-luu-nhap	\N	\N	2026-10-12 04:16:33.533
cmv4qq7wf0005xsrwpnx4giau	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f4216ab6-14ee-4069-b2a7-6bc39d61c0c6	/blog/editor	{"durationMs": 101603}	\N	2026-10-12 04:17:00.544
cmv4qukqi0006xsrwtpzo9ya5	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 86802}	\N	2026-10-12 04:20:23.803
cmv4qup750007xsrwuhhk2mm7	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 2024}	\N	2026-10-12 04:20:29.583
cmud3zmp500025ig93t69fhtp	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/dashboard	{"durationMs": 338}	\N	2026-09-22 20:10:41.703
cmv4qvjdh0008xsrwkkjvepru	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 20375}	\N	2026-10-12 04:21:08.691
cmud3znv60004xhvx2gdgllr8	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f4fa9e00-29b3-4622-be38-4949634ee909	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1525}	\N	2026-09-22 20:10:43.218
cmud48gid0000n85oes2msky9	PAGE_LEAVE	\N	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/	{"durationMs": 5000}	\N	2026-09-22 20:17:33.589
cmud48mvw0000jcdb63hcyge3	PAGE_VIEW	\N	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/auth/login	\N	\N	2026-09-22 20:17:41.85
cmud48rer000011e91j9jqn5e	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/auth/login	{"durationMs": 14108}	\N	2026-09-22 20:17:47.715
cmud48rfb000111e916f79km6	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/dashboard	\N	\N	2026-09-22 20:17:47.735
cmud48rm6000211e9pfp492bn	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/dashboard	{"durationMs": 305}	\N	2026-09-22 20:17:47.983
cmud48s4n0000130j81s4zxfd	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-22 20:17:48.645
cmud499ju000311e924kx7fcc	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns	\N	\N	2026-09-22 20:18:11.225
cmud499kj0001130jbdah1f5v	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 23256}	\N	2026-09-22 20:18:11.25
cmud49bac000411e9oiurwv35	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-22 20:18:13.477
cmud49o1y000511e9z2m6vazr	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 16425}	\N	2026-09-22 20:18:30.011
cmud49b9y0002130jx8mhj6vl	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns	{"durationMs": 2209}	\N	2026-09-22 20:18:13.462
cmud4a6ks0003130jveuvuzsf	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 1406}	\N	2026-09-22 20:18:54.028
cmud4aba00004130ja7529bh4	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2676}	\N	2026-09-22 20:19:00.12
cmud4c5rl000012yomp7e1f1u	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 3349}	\N	2026-09-22 20:20:26.289
cmud51hb50000knbhutyvya1f	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/	\N	\N	2026-09-22 20:40:07.649
cmud51k8n0001knbhbvrxftn3	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/chat	\N	\N	2026-09-22 20:40:11.448
cmud51k8m000112yo4vortw3f	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/	{"durationMs": 3808}	\N	2026-09-22 20:40:11.447
cmud51lc70002knbh3w7t1nyd	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/chat	{"durationMs": 1437}	\N	2026-09-22 20:40:12.871
cmud51le90003knbhxkttwyu0	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/	\N	\N	2026-09-22 20:40:12.946
cmud51m1v000212yop5lwaq8a	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/projects	\N	\N	2026-09-22 20:40:13.795
cmud51m2b000312yosruddui6	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/	{"durationMs": 909}	\N	2026-09-22 20:40:13.811
cmud51mpb000412yoik2t7kua	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/	\N	\N	2026-09-22 20:40:14.64
cmud51mpf0004knbha4g36clg	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/projects	{"durationMs": 853}	\N	2026-09-22 20:40:14.644
cmud51zql0005knbhj3jj35g6	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/	{"durationMs": 16832}	\N	2026-09-22 20:40:31.531
cmud51zp4000512yo2h9k6cmz	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	\N	\N	2026-09-22 20:40:31.479
cmud5258i000612yorz2ffaaf	PAGE_VIEW	\N	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/	\N	\N	2026-09-22 20:40:38.659
cmud527qv000712yojwrgfjfi	PAGE_LEAVE	\N	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/	{"durationMs": 3258}	\N	2026-09-22 20:40:41.912
cmud527rc000812yoxooz7lhv	PAGE_VIEW	\N	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/auth/login	\N	\N	2026-09-22 20:40:41.929
cmud52duz000912yo9pdbdao6	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/dashboard	\N	\N	2026-09-22 20:40:49.835
cmud52dvp000a12yom6pneler	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/auth/login	{"durationMs": 7887}	\N	2026-09-22 20:40:49.861
cmud5258c0006knbhje7700lz	PAGE_LEAVE	\N	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"durationMs": 7182}	\N	2026-09-22 20:40:38.653
cmud52e3b000b12yo5jab80d4	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/dashboard	{"durationMs": 349}	\N	2026-09-22 20:40:50.135
cmud52e4o0007knbh89zznw9d	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 20:40:50.185
cmud52rze0008knbhg71vzblm	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 17964}	\N	2026-09-22 20:41:08.137
cmud52rzi000c12yo7say9op8	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	\N	\N	2026-09-22 20:41:08.141
cmud535b50009knbh3qj554lr	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	{"durationMs": 17283}	\N	2026-09-22 20:41:25.41
cmud535da000aknbhrb886d2c	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns/trong-1-000-cay-quanh-truong-hoc-1787564105656-hkf0j	\N	\N	2026-09-22 20:41:25.487
cmud537qd000d12yoejh1nhxy	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	\N	\N	2026-09-22 20:41:28.549
cmud537re0000ht73lukfw11d	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns/trong-1-000-cay-quanh-truong-hoc-1787564105656-hkf0j	{"durationMs": 3157}	\N	2026-09-22 20:41:28.587
cmud53brw000bknbhunwsaf8w	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns/trong-1-000-cay-quanh-truong-hoc-1787564105656-hkf0j	\N	\N	2026-09-22 20:41:33.788
cmud53bs60001ht73xifhjmx4	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	{"durationMs": 5238}	\N	2026-09-22 20:41:33.799
cmud53i1a0002ht73bojyhy8t	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns/trong-1-000-cay-quanh-truong-hoc-1787564105656-hkf0j	{"durationMs": 8085}	\N	2026-09-22 20:41:41.9
cmv4qwels0009xsrw7pghhjil	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 0}	\N	2026-10-12 04:21:49.168
cmv4qwevi000axsrw0bi1lk5i	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	f397a0ef-42f6-49ae-aac2-2a19d6fab2a5	/campaigns/album-mam-sang-1787564107725-3c1kg	{"durationMs": 963874}	\N	2026-10-12 04:21:49.518
cmud53i1e000cknbhrj7sfanm	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	\N	\N	2026-09-22 20:41:41.905
cmud53lug000e12yovy27yj3m	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	{"durationMs": 4953}	\N	2026-09-22 20:41:46.84
cmud53lva000f12yojtypi48d	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-09-22 20:41:46.87
cmud53p0h000g12yoriuz8dv2	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 4090}	\N	2026-09-22 20:41:50.946
cmud53p0f000dknbhubnp31gp	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	\N	\N	2026-09-22 20:41:50.944
cmud544m30003ht7397cjr2y5	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 20206}	\N	2026-09-22 20:42:11.163
cmud5uhe70000zghb798xt1l8	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4a6d89e5-1bcf-4e52-8f7b-272f7178bb70	/campaigns/vuon-rau-khong-rac-thai-1787564108182-5kp00	{"durationMs": 1}	\N	2026-09-22 21:02:40.784
cmudfprrk0000w5wzghu3esu6	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/products/5126c0a1-063f-4047-b44f-cd3aa156d1de	{"durationMs": 1216}	\N	2026-09-23 01:38:57.105
cmudg183d0000cdtn2wf5jzes	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/products/5126c0a1-063f-4047-b44f-cd3aa156d1de	{"durationMs": 1027}	\N	2026-09-23 01:47:51.482
cmudg1b130000wrruykajaalu	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/products/5126c0a1-063f-4047-b44f-cd3aa156d1de	{"durationMs": 1862}	\N	2026-09-23 01:47:55.287
cmudg1b3t0001wrru6e0ecgt2	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	7f376c97-2ad2-4ad3-849e-5f7b4110604f	/products/5126c0a1-063f-4047-b44f-cd3aa156d1de	{"durationMs": 0}	\N	2026-09-23 01:47:55.386
cmudg1hli0000l01azcfhms8b	PAGE_LEAVE	\N	\N	91f9dcc0-5938-469b-8d5f-4734f3e08204	/	{"durationMs": 4207}	\N	2026-09-23 01:48:03.798
cmudg1hm10000129b5ulzb6jy	PAGE_VIEW	\N	\N	91f9dcc0-5938-469b-8d5f-4734f3e08204	/auth/login	\N	\N	2026-09-23 01:48:03.818
cmudg1pi30001l01ai3d3d20c	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91f9dcc0-5938-469b-8d5f-4734f3e08204	/auth/login	{"durationMs": 10183}	\N	2026-09-23 01:48:14.043
cmudg1pjg0002l01atzhq3uf2	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91f9dcc0-5938-469b-8d5f-4734f3e08204	/dashboard	\N	\N	2026-09-23 01:48:14.093
cmudg1pso0003l01a9rioxkpy	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91f9dcc0-5938-469b-8d5f-4734f3e08204	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-23 01:48:14.424
cmudg1ptp0001129bxthwqmha	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91f9dcc0-5938-469b-8d5f-4734f3e08204	/dashboard	{"durationMs": 448}	\N	2026-09-23 01:48:14.461
cmudg29jj0000rz0861jyuf23	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	91f9dcc0-5938-469b-8d5f-4734f3e08204	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 6632}	\N	2026-09-23 01:48:40.013
cmudkki30000056jbwpsijogy	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9a968edf-9df9-4103-9e42-15cf272ea30b	/	{"durationMs": 1373}	\N	2026-09-23 03:54:49.356
cmudkki3s0000oeprgnonucev	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9a968edf-9df9-4103-9e42-15cf272ea30b	/campaigns/create	\N	\N	2026-09-23 03:54:49.385
cmudkklxc000156jbnstnbmfi	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	9a968edf-9df9-4103-9e42-15cf272ea30b	/campaigns/create	{"durationMs": 4963}	\N	2026-09-23 03:54:54.336
cmudkl2d40000106wgo3ote8m	PAGE_VIEW	\N	\N	ce53d3d1-6381-4535-8cec-5d0daf3861db	/	\N	\N	2026-09-23 03:55:15.638
cmudkl2ic0000xsl4kqx9uz5v	PAGE_VIEW	\N	\N	f54e6be3-ff52-4808-841a-541f3b5aff1b	/	\N	\N	2026-09-23 03:55:15.828
cmudkl5kh0000p9m1lvo7hxeo	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	89e46495-a561-43a8-b77e-4f498e013739	/	\N	\N	2026-09-23 03:55:19.794
cmudkl8de0001106wiipz8k2t	PAGE_VIEW	\N	\N	89e46495-a561-43a8-b77e-4f498e013739	/auth/login	\N	\N	2026-09-23 03:55:23.427
cmudkl8dr0000b4ze6sk7wqny	PAGE_LEAVE	\N	\N	89e46495-a561-43a8-b77e-4f498e013739	/	{"durationMs": 3653}	\N	2026-09-23 03:55:23.44
cmudklfk40001b4zecjz5p63e	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	89e46495-a561-43a8-b77e-4f498e013739	/dashboard	\N	\N	2026-09-23 03:55:32.74
cmudklfob0002b4zet5ghracb	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	89e46495-a561-43a8-b77e-4f498e013739	/auth/login	{"durationMs": 9172}	\N	2026-09-23 03:55:32.891
cmudklfsd0003b4zemx80gf23	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	89e46495-a561-43a8-b77e-4f498e013739	/dashboard	{"durationMs": 431}	\N	2026-09-23 03:55:33.038
cmudklftn0001p9m11zyq1x8z	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	89e46495-a561-43a8-b77e-4f498e013739	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-23 03:55:33.075
cmudklhsc0002p9m1hw8tbkla	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	89e46495-a561-43a8-b77e-4f498e013739	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2360}	\N	2026-09-23 03:55:35.629
cmudkmxb60000mp20b51l9csw	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	dffe166e-2407-4ffe-b387-e9346767b33d	/	\N	\N	2026-09-23 03:56:42.391
cmudkn1rd0001mp20d2dd5v1u	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	dffe166e-2407-4ffe-b387-e9346767b33d	/	{"durationMs": 0}	\N	2026-09-23 03:56:48.169
cmudkn1rj0002106w6kqxedwf	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	dffe166e-2407-4ffe-b387-e9346767b33d	/	{"durationMs": 5721}	\N	2026-09-23 03:56:48.175
cmudl17rw00006y3j27kl44vf	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	c240cb70-44f1-4a52-9fcc-0af55bde8b4a	/	\N	\N	2026-09-23 04:07:49.149
cmudl4cx70002mp20f4qvab75	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	c240cb70-44f1-4a52-9fcc-0af55bde8b4a	/	{"durationMs": 146569}	\N	2026-09-23 04:10:15.785
cmudl9g3s0003p9m1hqwdgyab	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	c240cb70-44f1-4a52-9fcc-0af55bde8b4a	/	{"durationMs": 3661}	\N	2026-09-23 04:14:13.193
cmudm8of50003mp20ns8jp1nx	PAGE_LEAVE	\N	\N	727657b4-beca-4378-9e7f-ddfeaa2c0b09	/	{"durationMs": 0}	\N	2026-09-23 04:41:36.93
cmudm8ofw0000pag6059o3sql	PAGE_LEAVE	\N	\N	727657b4-beca-4378-9e7f-ddfeaa2c0b09	/	{"durationMs": 12767}	\N	2026-09-23 04:41:36.956
cmudm8ekm0004p9m1spkvny7y	PAGE_VIEW	\N	\N	727657b4-beca-4378-9e7f-ddfeaa2c0b09	/	\N	\N	2026-09-23 04:41:24.163
cmudmelh10004mp20l1uakv7n	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	2476c6dc-2df0-4152-a37e-6ef7852c1700	/	\N	\N	2026-09-23 04:46:13.044
cmudmemfg0005p9m1wmd8qaw3	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	2476c6dc-2df0-4152-a37e-6ef7852c1700	/	{"durationMs": 1134}	\N	2026-09-23 04:46:14.285
cmudmemfq0000ep78ck67g1aa	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	2476c6dc-2df0-4152-a37e-6ef7852c1700	/	{"durationMs": 0}	\N	2026-09-23 04:46:14.295
cmug93vpv000012bf3f2q145p	PAGE_VIEW	\N	\N	49eb0e73-2a43-4285-acc6-6d29867b9b5e	/	\N	\N	2026-09-25 00:57:16.625
cmug93vsd000112bf8bmimhsx	PAGE_VIEW	\N	\N	a445e563-9e38-4861-bd6f-b98573471693	/	\N	\N	2026-09-25 00:57:16.716
cmug94ebb0000baxqafpof7u5	PAGE_VIEW	\N	\N	569d1911-e36f-48db-b7cf-95e5028f7c2c	/	\N	\N	2026-09-25 00:57:40.724
cmug94eca0001baxq0qktv5ws	PAGE_LEAVE	\N	\N	569d1911-e36f-48db-b7cf-95e5028f7c2c	/	{"durationMs": 2564}	\N	2026-09-25 00:57:40.724
cmug947qp0000104oexi4su2y	PAGE_VIEW	\N	\N	569d1911-e36f-48db-b7cf-95e5028f7c2c	/auth/login	\N	\N	2026-09-25 00:57:32.207
cmug94nvi0001104oi69pm18d	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	569d1911-e36f-48db-b7cf-95e5028f7c2c	/dashboard	\N	\N	2026-09-25 00:57:53.119
cmug94nvj000212bfvg12szlp	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	569d1911-e36f-48db-b7cf-95e5028f7c2c	/auth/login	{"durationMs": 20806}	\N	2026-09-25 00:57:53.119
cmug94o91000312bfofqgpicx	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	569d1911-e36f-48db-b7cf-95e5028f7c2c	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-25 00:57:53.605
cmug94rhy0002baxqi4xgjy9o	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	569d1911-e36f-48db-b7cf-95e5028f7c2c	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4214}	\N	2026-09-25 00:57:57.813
cmug94o920002104oqowe9e6f	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	569d1911-e36f-48db-b7cf-95e5028f7c2c	/dashboard	{"durationMs": 594}	\N	2026-09-25 00:57:53.606
cmuo175mr00008coyiuay7mba	PAGE_VIEW	\N	\N	f5958e3b-6509-4ef1-bdcb-08da1e671cec	/auth/login	\N	\N	2026-09-30 11:38:01.921
cmuo175lp0000fdhxtd7bm0e7	PAGE_LEAVE	\N	\N	f5958e3b-6509-4ef1-bdcb-08da1e671cec	/	{"durationMs": 1571}	\N	2026-09-30 11:38:01.885
cmuo17bms00018coyg2x5ojo0	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5958e3b-6509-4ef1-bdcb-08da1e671cec	/auth/login	{"durationMs": 7824}	\N	2026-09-30 11:38:09.7
cmuo17c5d00028coyevc0pwmn	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5958e3b-6509-4ef1-bdcb-08da1e671cec	/auth/login	{"durationMs": 706}	\N	2026-09-30 11:38:10.369
cmuo17c6n00038coyhyo2dnq2	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5958e3b-6509-4ef1-bdcb-08da1e671cec	/dashboard	\N	\N	2026-09-30 11:38:10.416
cmuo17cd100048coywde4k1sz	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5958e3b-6509-4ef1-bdcb-08da1e671cec	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-30 11:38:10.646
cmuo17cdt00058coyven4fz3l	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5958e3b-6509-4ef1-bdcb-08da1e671cec	/dashboard	{"durationMs": 280}	\N	2026-09-30 11:38:10.674
cmuo18ixj00006uqrzgv8anl9	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f5958e3b-6509-4ef1-bdcb-08da1e671cec	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4215}	\N	2026-09-30 11:39:05.815
cmuoanq3f00003brj70yo9036	PAGE_VIEW	\N	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/auth/login	\N	\N	2026-09-30 16:02:51.48
cmuoanr0m0000i5hsd2v1jnic	PAGE_LEAVE	\N	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/	{"durationMs": 716}	\N	2026-09-30 16:02:52.464
cmuoanri70001i5hs0a0hf5xe	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/auth/login	{"durationMs": 7017}	\N	2026-09-30 16:02:53.311
cmuoanrjn0002i5hsw3l2bijz	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/dashboard	\N	\N	2026-09-30 16:02:53.364
cmuoanryp0003i5hszopl0iwu	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/dashboard	{"durationMs": 786}	\N	2026-09-30 16:02:53.905
cmuoanrzg0000ni35oeqf3vt2	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-30 16:02:53.933
cmuoansdi0004i5hsqnhfrhze	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 489}	\N	2026-09-30 16:02:54.439
cmuoansdl0001ni352gn24os6	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/dashboard	\N	\N	2026-09-30 16:02:54.441
cmuoansoj0005i5hsiwj4badq	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-09-30 16:02:54.835
cmuoansok0002ni35ad1jxm29	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/dashboard	{"durationMs": 451}	\N	2026-09-30 16:02:54.836
cmuoao39a0000thv1qke1nc00	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	176d0a05-d2df-491b-ac61-9363a36a1eb6	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 13677}	\N	2026-09-30 16:03:08.543
cmuob1bks0000num9tnct3jau	PAGE_LEAVE	\N	\N	13a8f184-1366-430d-8b41-107870808327	/	{"durationMs": 9882}	\N	2026-09-30 16:13:25.852
cmuob1bl100002mtxk8lol6vp	PAGE_LEAVE	\N	\N	13a8f184-1366-430d-8b41-107870808327	/	{"durationMs": 0}	\N	2026-09-30 16:13:25.862
cmuob1c7x00012mtxpjb1j9dc	PAGE_VIEW	\N	\N	13a8f184-1366-430d-8b41-107870808327	/	\N	\N	2026-09-30 16:13:26.685
cmuob1e1a00022mtxhgkavs28	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	be82936e-27b3-4dfc-a4f1-a201bc811112	/	{"durationMs": 10188}	\N	2026-09-30 16:13:29.039
cmupfgl7i0000wdu7p0mh98l1	PAGE_VIEW	\N	\N	f002ba25-ea54-4eb3-a86c-e7aaef38c0b4	/	\N	\N	2026-10-01 11:05:02.812
cmupfgmtd0001wdu7h5h7qvgh	PAGE_LEAVE	\N	\N	f002ba25-ea54-4eb3-a86c-e7aaef38c0b4	/	{"durationMs": 2070}	\N	2026-10-01 11:05:04.898
cmuqcnsyd0000rpa1402f75pz	PAGE_VIEW	\N	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/	\N	\N	2026-10-02 02:34:26.769
cmuqcp6wb0000o2xz0lgxwh5d	PAGE_VIEW	\N	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/auth/login	\N	\N	2026-10-02 02:35:31.497
cmuqcp37s0001rpa1iw6xxtsa	PAGE_LEAVE	\N	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/	{"durationMs": 1490}	\N	2026-10-02 02:35:26.717
cmuqcp7qb0002rpa11f6d0okj	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/dashboard	\N	\N	2026-10-02 02:35:32.579
cmuqcp7qe0001o2xzyr1xm0cs	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/auth/login	{"durationMs": 5787}	\N	2026-10-02 02:35:32.582
cmuqcp8cc0003rpa18ler86mw	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/dashboard	{"durationMs": 861}	\N	2026-10-02 02:35:33.373
cmuqcp8jq0002o2xz4wurduru	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 284}	\N	2026-10-02 02:35:33.639
cmuqcp8kx0003o2xz302hr2jp	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/dashboard	\N	\N	2026-10-02 02:35:33.681
cmuqcp8ci0000sdl2g4tt0sx9	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-02 02:35:33.377
cmuqcp8r90004o2xzsc1ko1na	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/dashboard	{"durationMs": 264}	\N	2026-10-02 02:35:33.909
cmuqcp8ra0001sdl2h8d4ya6q	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-02 02:35:33.911
cmuqcpe6r0002sdl2totsntrt	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	43f2c0ad-2f13-41f3-950c-4d0a9d7fc869	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 7038}	\N	2026-10-02 02:35:40.948
cmuqfih5k000075k77k9ext7w	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	d8314f9c-00a9-44cc-ae4c-76ebcd896eb8	/	\N	\N	2026-10-02 03:54:17.045
cmuqfih680000mf4rd1x46dl4	PAGE_VIEW	\N	\N	e051c44a-7c0c-4fe3-9210-62233e3e9a30	/	\N	\N	2026-10-02 03:54:17.07
cmuqfihy70001mf4r75kj4wsh	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	d8314f9c-00a9-44cc-ae4c-76ebcd896eb8	/	{"durationMs": 1191}	\N	2026-10-02 03:54:18.08
cmuqfihyl0000jecrxvju4zag	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	d8314f9c-00a9-44cc-ae4c-76ebcd896eb8	/campaigns/create	\N	\N	2026-10-02 03:54:18.094
cmuqfij4x0001jecrx5w164qr	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	d8314f9c-00a9-44cc-ae4c-76ebcd896eb8	/campaigns/create	{"durationMs": 1534}	\N	2026-10-02 03:54:19.617
cmuqfij630002jecrd5200mwn	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	d8314f9c-00a9-44cc-ae4c-76ebcd896eb8	/dashboard	\N	\N	2026-10-02 03:54:19.66
cmuqfijg60003jecr0x1oquwo	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	d8314f9c-00a9-44cc-ae4c-76ebcd896eb8	/dashboard	{"durationMs": 380}	\N	2026-10-02 03:54:20.023
cmuqfijg60002mf4rc7xfandw	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	d8314f9c-00a9-44cc-ae4c-76ebcd896eb8	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-02 03:54:20.022
cmuqfiwjv000011xmri2qo2w6	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	d8314f9c-00a9-44cc-ae4c-76ebcd896eb8	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 12753}	\N	2026-10-02 03:54:37.001
cmuukdj8s0000nhz9ab273rxv	PAGE_VIEW	\N	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	\N	\N	2026-10-05 01:21:29.258
cmuukdl2t0001nhz95rtnx6la	PAGE_LEAVE	\N	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 2394}	\N	2026-10-05 01:21:31.637
cmuukeqoh0000rsgvta25qu83	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/auth/login	{"durationMs": 53823}	\N	2026-10-05 01:22:25.553
cmuukeqo80000e9yc39g45n0l	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/dashboard	\N	\N	2026-10-05 01:22:25.544
cmuukeqva0001e9yc2ut56fte	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/dashboard	{"durationMs": 323}	\N	2026-10-05 01:22:25.798
cmuukeqwf0001rsgvqhau9pdj	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-05 01:22:25.84
cmuukf41x0002rsgvotc26mvm	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 17094}	\N	2026-10-05 01:22:42.885
cmuukf4260002e9yc17zcaebs	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	\N	\N	2026-10-05 01:22:42.892
cmuukf92p0003e9ycmmkyh4ly	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 6520}	\N	2026-10-05 01:22:49.393
cmuukf9320003rsgv1oihz6z4	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-05 01:22:49.406
cmuukfckl0004rsgv7nochgy1	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	\N	\N	2026-10-05 01:22:53.925
cmuukfcl80005rsgv0t6kzrlb	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4480}	\N	2026-10-05 01:22:53.949
cmuukfedr0004e9ycccfoc008	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 2382}	\N	2026-10-05 01:22:56.271
cmuuki7so0002nhz9kr2mykgx	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 1329}	\N	2026-10-05 01:25:07.704
cmuukje3n0003nhz94bb050ep	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 759}	\N	2026-10-05 01:26:02.532
cmuukjfu30005e9ycpil056l2	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 1058}	\N	2026-10-05 01:26:04.779
cmuukjpwj0004nhz997ugtbp8	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 12666}	\N	2026-10-05 01:26:17.828
cmuukjqpw0006e9yctyuueycw	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/mam-xanh-hoc-duong-mt18obvz	\N	\N	2026-10-05 01:26:17.832
cmuukk2ar0006rsgvdmpslulp	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 16052}	\N	2026-10-05 01:26:33.89
cmuukk3pf0000n8j5u3x90zmg	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	\N	\N	2026-10-05 01:26:35.53
cmuukkeg10001n8j5ewp6a4i1	PAGE_LEAVE	\N	\N	04d246e9-c8ca-4726-9fe3-8777e6c6edf9	/	{"durationMs": 24322}	\N	2026-10-05 01:26:49.633
cmuukkg3y0002n8j5hqkdzu8q	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 17910}	\N	2026-10-05 01:26:51.788
cmuukkefz0007rsgv2jpnrov4	PAGE_VIEW	\N	\N	04d246e9-c8ca-4726-9fe3-8777e6c6edf9	/auth/login	\N	\N	2026-10-05 01:26:49.63
cmuukks6t0007e9ycy8pzitb0	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 1483}	\N	2026-10-05 01:27:07.446
cmuukkx070003n8j5redzm2y8	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	04d246e9-c8ca-4726-9fe3-8777e6c6edf9	/dashboard	\N	\N	2026-10-05 01:27:13.687
cmuukkx0b0008e9yc5jkncp40	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	04d246e9-c8ca-4726-9fe3-8777e6c6edf9	/auth/login	{"durationMs": 23990}	\N	2026-10-05 01:27:13.692
cmuukkxdt0009e9yc11skgelb	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	04d246e9-c8ca-4726-9fe3-8777e6c6edf9	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-10-05 01:27:14.177
cmuukkxe40004n8j51rykmpoo	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	04d246e9-c8ca-4726-9fe3-8777e6c6edf9	/dashboard	{"durationMs": 518}	\N	2026-10-05 01:27:14.189
cmuukl57b0005n8j5mtf3exk8	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	04d246e9-c8ca-4726-9fe3-8777e6c6edf9	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 10133}	\N	2026-10-05 01:27:24.311
cmuuklfqf0008rsgvejdcr0m2	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 9061}	\N	2026-10-05 01:27:37.96
cmuuklmbn0009rsgvgr9aei2f	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 654}	\N	2026-10-05 01:27:46.5
cmuuklrol000arsgv2xwwye0l	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 986}	\N	2026-10-05 01:27:53.445
cmuukn3k6000ae9ycjv2ynlgu	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 27644}	\N	2026-10-05 01:28:55.495
cmuukoj3p000brsgv8j3wgk94	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 944}	\N	2026-10-05 01:30:02.293
cmuukq3ya0006n8j5pu87lgvh	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 4848}	\N	2026-10-05 01:31:15.971
cmuukq57f000be9yc0ju36dw5	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 801}	\N	2026-10-05 01:31:17.595
cmuukq5ug000ce9yc64qaizoo	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 442}	\N	2026-10-05 01:31:18.424
cmuukxfo6000de9yctpm71v4l	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 781}	\N	2026-10-05 01:36:57.751
cmuukjvo20005nhz94xy63y71	PAGE_VIEW	\N	\N	04d246e9-c8ca-4726-9fe3-8777e6c6edf9	/	\N	\N	2026-10-05 01:26:25.297
cmuul88r60000ailvzwhitvaw	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 1729}	\N	2026-10-05 01:45:22.003
cmuulthmx0001ailv95pbe8rk	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 742}	\N	2026-10-05 02:01:53.289
cmuultud30000u1i05vebxy64	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 962}	\N	2026-10-05 02:02:09.783
cmuulw4910002ailvzw4ygesx	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 18150}	\N	2026-10-05 02:03:55.909
cmuum77mt0003ailv1e55z4lv	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 80701}	\N	2026-10-05 02:12:33.51
cmuumague0001u1i0zlgq51uh	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 1035}	\N	2026-10-05 02:15:05.414
cmuumuxsd0004ailvpsvi5eyw	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 690}	\N	2026-10-05 02:31:00.494
cmuumw61i0005ailvxdm8xpuy	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 612}	\N	2026-10-05 02:31:57.847
cmuumx73t0002u1i0vqem7tpi	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 985}	\N	2026-10-05 02:32:45.882
cmuumxhot0000iwo3dmen9cke	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 563}	\N	2026-10-05 02:32:59.598
cmuumznqg0006ailv1xzcm0rc	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 655}	\N	2026-10-05 02:34:40.745
cmuun0ca40001iwo3lip5bhxz	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 380}	\N	2026-10-05 02:35:12.556
cmuun0l560003u1i0ngypti5j	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 640}	\N	2026-10-05 02:35:24.041
cmuun10ha0002iwo3x8xe7fcc	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 556}	\N	2026-10-05 02:35:43.918
cmuun1b9d0004u1i0d77w5clj	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 666}	\N	2026-10-05 02:35:57.889
cmuun3atk0003iwo35iyldnon	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 758}	\N	2026-10-05 02:37:30.632
cmuun3cc70000j2jsadp29qdo	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 321}	\N	2026-10-05 02:37:32.597
cmuun7bwm0001j2jsczi3npof	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 488}	\N	2026-10-05 02:40:38.662
cmuun7md30002j2js5ek14xob	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 7492}	\N	2026-10-05 02:40:52.213
cmuun7mel0003j2jsfoeiestk	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/projects	\N	\N	2026-10-05 02:40:52.269
cmuun7ndd0004j2jszkoq5d1m	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/projects	{"durationMs": 1314}	\N	2026-10-05 02:40:53.521
cmuun7ndv0005j2jsklk2fy5k	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	\N	\N	2026-10-05 02:40:53.54
cmuun7r300004iwo32wx5bp5d	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:40:58.333
cmuun7rcn0005iwo362t04myn	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:40:58.679
cmuun7ry00006iwo352kz8tr8	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:40:59.448
cmuun7so60007iwo3arr7yhah	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:00.39
cmuun7tgq0008iwo3igdv3tw5	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:01.418
cmuun7u1q0009iwo36r2elhd7	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:02.174
cmuun7uq3000aiwo3lsblowod	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:03.052
cmuun7v83000biwo30chf2s19	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:03.699
cmuun7vf5000ciwo39s8cwdzc	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:03.954
cmuun7vki000diwo3adlwh1y4	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:04.146
cmuun7vyn000eiwo3x20bep46	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:04.655
cmuun7w3r000fiwo3qbzl83r2	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:04.839
cmuun7w8q000giwo3zo8p3lzi	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:05.019
cmuun7we2000hiwo3mhnld93f	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:05.21
cmuun7wig000iiwo3pazpbs57	CTA_CLICK	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"ctaId": "add_to_cart", "label": "Them vao gio hang"}	\N	2026-10-05 02:41:05.368
cmuun7wvd000jiwo3wbjgu6aj	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/workshop-phong-thu-mien-phi-1787564107953-0w5jn	{"durationMs": 12316}	\N	2026-10-05 02:41:05.834
cmuun88nh000kiwo3j286ekzb	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/products/eaed0da6-9510-4a54-8020-2c5c8d6a03a3	{"durationMs": 3163}	\N	2026-10-05 02:41:21.101
cmuun7wvi0006j2jsgysfm8lh	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/products/eaed0da6-9510-4a54-8020-2c5c8d6a03a3	\N	\N	2026-10-05 02:41:05.838
cmuun82hc0007j2jsn1ttjjee	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/products/eaed0da6-9510-4a54-8020-2c5c8d6a03a3	{"durationMs": 7246}	\N	2026-10-05 02:41:13.103
cmuun88lv0008j2js4f9u10q3	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/chat	\N	\N	2026-10-05 02:41:21.044
cmuun8b5y000liwo3x3dp5yok	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/chat	{"durationMs": 3335}	\N	2026-10-05 02:41:24.358
cmuun8b7p000miwo3e426xv1s	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	\N	\N	2026-10-05 02:41:24.422
cmuun93cj000niwo3hijudmki	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 36509}	\N	2026-10-05 02:42:00.884
cmuun9dii000oiwo3hscwcula	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 13180}	\N	2026-10-05 02:42:14.057
cmuun93co0009j2jsp6ecm26v	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/campaigns/mam-xanh-hoc-duong-mt18obvz	\N	\N	2026-10-05 02:42:00.888
cmuun9dij000aj2jsa25b1yvh	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	\N	\N	2026-10-05 02:42:14.059
cmuundrtc0007ailvzcyg58lw	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 205126}	\N	2026-10-05 02:45:39.216
cmuuopks70008ailvm3fg19a6	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	04d246e9-c8ca-4726-9fe3-8777e6c6edf9	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 0}	\N	2026-10-05 03:22:49.591
cmuuopksg000piwo37qgfjq4g	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	04d246e9-c8ca-4726-9fe3-8777e6c6edf9	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 3136}	\N	2026-10-05 03:22:49.6
cmuuoyz2x0000n6ch5n77ja1j	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 1025}	\N	2026-10-05 03:30:08.026
cmuuppmj60000la4t2wzh02df	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 485}	\N	2026-10-05 03:50:51.473
cmuuppmit000bj2js7srqr7ol	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	7ee1977c-39b6-4e53-b3b3-6873d6dcc8e4	/	{"durationMs": 0}	\N	2026-10-05 03:50:51.462
cmuzanwqu0000wiiozystq72p	PAGE_LEAVE	\N	\N	561a7395-f456-4605-8c3c-828912ed0586	/	{"durationMs": 3111}	\N	2026-10-08 08:48:28.036
cmuzanwq10000ntr8pofaf3oh	PAGE_VIEW	\N	\N	561a7395-f456-4605-8c3c-828912ed0586	/auth/login	\N	\N	2026-10-08 08:48:28.01
cmuzao2l70001wiioa4i4w4c0	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/auth/login	{"durationMs": 7543}	\N	2026-10-08 08:48:35.612
cmuzao2mx0001ntr80gxa7m2l	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard	\N	\N	2026-10-08 08:48:35.673
cmuzao2vz0002ntr8oo026lws	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard	{"durationMs": 485}	\N	2026-10-08 08:48:35.999
cmuzao2z000003ku21z6zss88	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-08 08:48:36.109
cmuzao5yz00013ku2bu1aa30s	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	\N	\N	2026-10-08 08:48:39.995
cmuzao5z20002wiioi3ciixaj	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 3963}	\N	2026-10-08 08:48:39.999
cmuzaobb2000011kybz0h1ayd	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	{"durationMs": 6951}	\N	2026-10-08 08:48:46.91
cmuzaobjs000111ky35tvcrol	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard	{"durationMs": 327}	\N	2026-10-08 08:48:47.224
cmuzaowbv0000ayh8zfsy9r3g	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 26902}	\N	2026-10-08 08:49:14.156
cmuzapr3u0001ayh8w5m05sct	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2044}	\N	2026-10-08 08:49:54.043
cmuzark2m0002ayh88236atkl	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 2993}	\N	2026-10-08 08:51:18.238
cmuzatct2000211ky040wqm4f	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	\N	\N	2026-10-08 08:52:42.134
cmuzatesy000311kydo6pgoy2	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard	\N	\N	2026-10-08 08:52:44.723
cmuzatet00003ayh830e6bpn7	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	{"durationMs": 2610}	\N	2026-10-08 08:52:44.723
cmuzatf9f000411kyd2un78ad	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-08 08:52:45.315
cmuzatf9i0004ayh8fjreo5eb	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard	{"durationMs": 578}	\N	2026-10-08 08:52:45.319
cmuzatrig000511ky52g2zjwb	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard/creator/hoi-vien	\N	\N	2026-10-08 08:53:01.191
cmuzatriw000611kytb7t2naq	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 15875}	\N	2026-10-08 08:53:01.209
cmuzatv140005ayh8fo6115iz	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard/creator/hoi-vien	{"durationMs": 4539}	\N	2026-10-08 08:53:05.752
cmuzatv1t0006ayh8ttt6k1dx	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-08 08:53:05.778
cmuzaum7g0007ayh81ipt7nxo	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 35253}	\N	2026-10-08 08:53:40.972
cmuzaum82000711kyrczomwd2	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard/bang-cap	\N	\N	2026-10-08 08:53:40.994
cmuzavn5z0008ayh80h5vss2m	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	\N	\N	2026-10-08 08:54:28.869
cmuzavopc00001un5gk1qx95l	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	{"durationMs": 1929}	\N	2026-10-08 08:54:30.865
cmuzavn5t000811ky8uybeg05	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard/bang-cap	{"durationMs": 47883}	\N	2026-10-08 08:54:28.864
cmuzb7wsd0009ayh8fcag0jh6	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	{"durationMs": 11035}	\N	2026-10-08 09:04:00.211
cmuzb7z5e000aayh8ny2nwswb	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/users/search	\N	\N	2026-10-08 09:04:01.223
cmuzb87nz000bayh8fx3q3s26	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/blog	\N	\N	2026-10-08 09:04:15.311
cmuzb7wsg000911kyxcko0hmf	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/projects	{"durationMs": 1008}	\N	2026-10-08 09:04:01.216
cmuzb87oc000a11kyvtqq0chr	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/users/search	{"durationMs": 14080}	\N	2026-10-08 09:04:15.324
cmuzb883h000cayh861intg1w	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/blog	{"durationMs": 569}	\N	2026-10-08 09:04:15.87
cmuzb7w0700011un5h21df3v3	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/projects	\N	\N	2026-10-08 09:04:00.2
cmuzb883z00021un5ywgts63g	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/projects	\N	\N	2026-10-08 09:04:15.886
cmuzb8ldl00031un5yew73iwo	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/projects	{"durationMs": 17162}	\N	2026-10-08 09:04:33.079
cmv523hcn0000kzj92cq50d8u	PAGE_VIEW	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/	\N	\N	2026-10-12 09:35:15.094
cmuzbho5m000dayh8izslljb9	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/gioi-thieu	\N	\N	2026-10-08 09:11:36.586
cmuzbholz000eayh8r38wxwft	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/projects	\N	\N	2026-10-08 09:11:37.175
cmuzbhomf000fayh8tdalkdsh	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/gioi-thieu	{"durationMs": 548}	\N	2026-10-08 09:11:37.191
cmuzbhoqg0000edbrju9mxnrz	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/projects	{"durationMs": 416323}	\N	2026-10-08 09:11:37.308
cmuzbhq3b000gayh80z2o22ed	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/blog	\N	\N	2026-10-08 09:11:39.096
cmuzbhqc40000w5oat3ntia8d	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/projects	{"durationMs": 1895}	\N	2026-10-08 09:11:39.408
cmuzbhqfq0001w5oavyt3jlch	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/blog	{"durationMs": 468}	\N	2026-10-08 09:11:39.543
cmuzbhqft000hayh85oohgjf7	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/users/search	\N	\N	2026-10-08 09:11:39.545
cmuzbhzow000iayh81iovs4yn	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/users/search	{"durationMs": 11998}	\N	2026-10-08 09:11:51.534
cmuzbhzpo0002w5oagkunwuw0	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/chat	\N	\N	2026-10-08 09:11:51.564
cmuzbiy0y0001edbrm4b0eiao	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/chat	{"durationMs": 44525}	\N	2026-10-08 09:12:36.033
cmuzbiy1k0002edbr9ntqqvrs	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	\N	\N	2026-10-08 09:12:36.056
cmuzbj5yo000jayh8njhj0610	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	{"durationMs": 10195}	\N	2026-10-08 09:12:46.321
cmuzbjgnb0005w5oa8pfrvq2t	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	{"durationMs": 816}	\N	2026-10-08 09:13:00.168
cmuzbmbzl000049e6gt83p3un	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	{"durationMs": 6392}	\N	2026-10-08 09:15:14.097
cmuzbmjj6000149e6r5ylhblv	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/gioi-thieu	{"durationMs": 9776}	\N	2026-10-08 09:15:23.873
cmuzbmjkb000249e61ca6eum7	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/policy/privacy	\N	\N	2026-10-08 09:15:23.916
cmuzbne1e000349e6qxr6pkge	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/policy/privacy	{"durationMs": 39475}	\N	2026-10-08 09:16:03.409
cmuzbnfcz0000jo0ajh0xsizr	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/gioi-thieu	\N	\N	2026-10-08 09:16:05.121
cmuzbnqqj000449e69lqdf83u	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/policy/privacy	{"durationMs": 646}	\N	2026-10-08 09:16:19.868
cmuzbntf70001jo0augkudt27	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	\N	\N	2026-10-08 09:16:23.347
cmuzbntfk000549e6mo9dew7t	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/policy/privacy	{"durationMs": 2613}	\N	2026-10-08 09:16:23.36
cmuzbnumx000649e6pivjfx7p	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	{"durationMs": 1517}	\N	2026-10-08 09:16:24.922
cmuzbuuly0003edbrwdt4ilew	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard	\N	\N	2026-10-08 09:21:51.478
cmuzbuum5000749e6bwjo30f5	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/	{"durationMs": 2695}	\N	2026-10-08 09:21:51.486
cmuzbuypj0002jo0ay199hztl	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4958}	\N	2026-10-08 09:21:56.792
cmuzbuuvz0004edbrxk1yq4yo	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/dashboard	{"durationMs": 350}	\N	2026-10-08 09:21:51.84
cmuzbuuvx000849e6dg7dp4zh	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	561a7395-f456-4605-8c3c-828912ed0586	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-08 09:21:51.838
cmuzffl1r0000a4hg639d6qny	PAGE_VIEW	\N	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/auth/login	\N	\N	2026-10-08 11:01:57.709
cmuzffljl0000kodc6vg4088i	PAGE_LEAVE	\N	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/	{"durationMs": 27774}	\N	2026-10-08 11:01:58.351
cmuzffmkg0001kodce0ffbq1k	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/auth/login	{"durationMs": 5994}	\N	2026-10-08 11:01:59.68
cmuzffmki0001a4hgcbrqv79y	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/dashboard	\N	\N	2026-10-08 11:01:59.682
cmuzffmyo0002a4hglaq7nj1m	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/dashboard	{"durationMs": 591}	\N	2026-10-08 11:02:00.192
cmuzffmyy0002kodcdleozpxr	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	\N	2026-10-08 11:02:00.203
cmuzffze10003kodc77nfdpws	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 16085}	\N	2026-10-08 11:02:16.296
cmv4k8gv60000t7g1mlefkdv4	PAGE_VIEW	\N	\N	5345b85f-3b7a-43d4-80b6-873fd0376f9d	/	\N	\N	2026-10-12 01:15:14.657
cmv4ka6l300007q8v5ldhupcz	PAGE_LEAVE	\N	\N	5345b85f-3b7a-43d4-80b6-873fd0376f9d	/auth/login	{"durationMs": 4305}	\N	2026-10-12 01:16:34.644
cmv4ka6ls00017q8vmfa19j9f	PAGE_VIEW	\N	\N	5345b85f-3b7a-43d4-80b6-873fd0376f9d	/auth/login	\N	\N	2026-10-12 01:16:34.644
cmv4kayks00027q8v5ytuf8ah	PAGE_VIEW	\N	\N	5345b85f-3b7a-43d4-80b6-873fd0376f9d	/campaigns	\N	\N	2026-10-12 01:17:10.922
cmv4kb1eh0000xglnzgjulnej	PAGE_LEAVE	\N	\N	5345b85f-3b7a-43d4-80b6-873fd0376f9d	/	{"durationMs": 44826}	\N	2026-10-12 01:17:14.584
cmv4kbd7l0001xglnrabxjix4	PAGE_VIEW	\N	\N	5345b85f-3b7a-43d4-80b6-873fd0376f9d	/	\N	\N	2026-10-12 01:17:29.888
cmv4kbdb00002xglncraxy5gq	PAGE_LEAVE	\N	\N	5345b85f-3b7a-43d4-80b6-873fd0376f9d	/campaigns	{"durationMs": 18984}	\N	2026-10-12 01:17:30.013
cmv4kc1300003xglnuoslll1f	PAGE_LEAVE	\N	\N	5345b85f-3b7a-43d4-80b6-873fd0376f9d	/	{"durationMs": 30864}	\N	2026-10-12 01:18:00.827
cmv4mou2h0000xcneysvi8sv1	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog	\N	\N	2026-10-12 02:23:57.498
cmv4nq7is0009vit7r609kjeb	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/users/search	{"durationMs": 3596}	\N	2026-10-12 02:53:01.204
cmv4mou2h00009jwdmyle2oyk	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/profile/d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	{"durationMs": 4779}	\N	2026-10-12 02:23:57.495
cmv4mp2bd00019jwdfmb5tbx5	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog	{"durationMs": 10688}	\N	2026-10-12 02:24:08.185
cmv4mp2bj0000mqgrqhf86oxv	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog/editor	\N	\N	2026-10-12 02:24:08.191
cmv4mpzjw0001mqgr4z3dr4w5	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog/editor	{"durationMs": 43026}	\N	2026-10-12 02:24:51.26
cmv4mq6ex0002mqgr44lmtkra	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog/editor	{"durationMs": 6806}	\N	2026-10-12 02:25:00.153
cmv4mr2xe0000io0ocuwe1eou	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog	\N	\N	2026-10-12 02:25:42.288
cmv4mr2x70001xcnebos734e7	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog/editor	{"durationMs": 30079}	\N	2026-10-12 02:25:42.281
cmv4mr8740001io0ooi2plon8	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog	{"durationMs": 6866}	\N	2026-10-12 02:25:49.121
cmv4mr87b0002xcne6evmdpol	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog/huong-dan-nhan-san-pham-so-1787564123531-0e9kj	\N	\N	2026-10-12 02:25:49.127
cmv4ms46c00029jwdfq1zktbc	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog/huong-dan-nhan-san-pham-so-1787564123531-0e9kj	{"durationMs": 41403}	\N	2026-10-12 02:26:30.564
cmv4msffm0003mqgr98qzd0vf	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/chat	\N	\N	2026-10-12 02:26:45.154
cmv4msffn0002io0oav71pmjt	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/blog	{"durationMs": 14611}	\N	2026-10-12 02:26:45.156
cmv4msp2c0003io0o3mzcymal	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	b39c5572-2073-4e86-9051-a52a44fc6613	/chat	{"durationMs": 12408}	\N	2026-10-12 02:26:57.637
cmv4nns8x0000coyg325abucu	PAGE_VIEW	\N	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	\N	\N	2026-10-12 02:51:08.097
cmv4nnyo50000vit7cowuynsk	PAGE_LEAVE	\N	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 8273}	\N	2026-10-12 02:51:16.421
cmv4no0lx0001vit7utuqsshi	PAGE_LEAVE	\N	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/	{"durationMs": 15430}	\N	2026-10-12 02:51:18.934
cmv4no0m70000111qojiqobqf	PAGE_VIEW	\N	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/auth/login	\N	\N	2026-10-12 02:51:18.944
cmv4no8120001111qp0j5gbyo	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/auth/login	{"durationMs": 9576}	\N	2026-10-12 02:51:28.55
cmv4no83d0002111qmsi8h19j	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/dashboard	\N	\N	2026-10-12 02:51:28.633
cmv4no8fp0003111q0mngym53	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/dashboard	{"durationMs": 450}	\N	2026-10-12 02:51:29.078
cmv4no8nx0002vit79jk7iof3	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-10-12 02:51:29.373
cmv4no8om0003vit7wmwt00rk	PAGE_LEAVE	\N	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 2025}	\N	2026-10-12 02:51:29.399
cmv4no8pw0001coyg1inzw5lm	PAGE_VIEW	\N	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/auth/login	\N	\N	2026-10-12 02:51:29.443
cmv4nobif0002coyg95urtp8j	PAGE_LEAVE	\N	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/auth/login	{"durationMs": 3651}	\N	2026-10-12 02:51:33.064
cmv4noep20004111qb82jeew6	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog	\N	\N	2026-10-12 02:51:37.191
cmv4noepq0003coygcjg1b0kb	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 8214}	\N	2026-10-12 02:51:37.215
cmv4nokbo0004coyg7n182a0z	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/dashboard	\N	\N	2026-10-12 02:51:44.485
cmv4nokbq0005111qs71jzp7h	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/auth/login	{"durationMs": 5435}	\N	2026-10-12 02:51:44.487
cmv4nokjv0006111q8rz3nal8	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/cmphnhw8e0002so1uh16dwpvn	\N	\N	2026-10-12 02:51:44.78
cmv4nokjx0005coygaogyyu2n	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/dashboard	{"durationMs": 338}	\N	2026-10-12 02:51:44.781
cmv4noprl0006coygwl3s4vhn	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 6765}	\N	2026-10-12 02:51:51.537
cmv4noxrs0007coygok1xcoaw	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog	{"durationMs": 24737}	\N	2026-10-12 02:52:01.911
cmv4noxsj0008coyghe1bgnyv	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	\N	\N	2026-10-12 02:52:01.94
cmv4npbyr0004vit7wdae9pza	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/cmphnhw8e0002so1uh16dwpvn	{"durationMs": 6077}	\N	2026-10-12 02:52:20.306
cmv4npbz60005vit7kbplpe0k	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	\N	\N	2026-10-12 02:52:20.322
cmv4npq680007111qcjlza4o9	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/chat	\N	\N	2026-10-12 02:52:38.72
cmv4npq6f0006vit7os6t6rvi	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 18401}	\N	2026-10-12 02:52:38.727
cmv4npw1x0008111q2m15p39c	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/chat	{"durationMs": 7624}	\N	2026-10-12 02:52:46.34
cmv4npw2b0009coygeaks5ccv	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/projects	\N	\N	2026-10-12 02:52:46.351
cmv4npzhj0007vit790vdwdnp	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/blog	\N	\N	2026-10-12 02:52:50.792
cmv4npzhy000acoyguypo816e	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/projects	{"durationMs": 4447}	\N	2026-10-12 02:52:50.806
cmv4nq4rk0008vit74echgaka	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/users/search	\N	\N	2026-10-12 02:52:57.632
cmv4nq4ru000bcoygsfvq0d64	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/blog	{"durationMs": 6804}	\N	2026-10-12 02:52:57.643
cmv4nq7ip000ccoyg2d4r24jj	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/projects	\N	\N	2026-10-12 02:53:01.201
cmv4nqbom000dcoygbpn2mwpf	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/projects	{"durationMs": 3254}	\N	2026-10-12 02:53:06.599
cmv4nq969000bvit7lgtldmcd	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/gioi-thieu	{"durationMs": 1748}	\N	2026-10-12 02:53:03.345
cmv4nq7tc0009111qzf6alkwm	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/projects	{"durationMs": 401}	\N	2026-10-12 02:53:01.582
cmv4nq96a000a111q55ivktgh	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/projects	\N	\N	2026-10-12 02:53:03.346
cmv4nqeii000ecoygec8veq1m	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 0}	\N	2026-10-12 02:53:10.267
cmv4nqejd000fcoygo5cxgg44	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 68340}	\N	2026-10-12 02:53:10.297
cmv4nqekg000gcoyga1n740gv	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	\N	\N	2026-10-12 02:53:10.336
cmv4nqerg0000lb1asnbz3497	PAGE_VIEW	\N	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/	\N	\N	2026-10-12 02:53:10.585
cmv4nr0820000n9zrky9g8xwk	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/projects	{"durationMs": 6991}	\N	2026-10-12 02:53:38.403
cmv4ns19x0001n9zru8twxsxz	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/projects	{"durationMs": 9200}	\N	2026-10-12 02:54:26.422
cmv4ns19x0001lb1axu75qtt5	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/edit	\N	\N	2026-10-12 02:54:26.422
cmv4ns1ze0002n9zrpk6saish	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/cmphnhw8e0002so1uh16dwpvn/edit	\N	\N	2026-10-12 02:54:27.339
cmv4nsbkx000b111q9c4zn6t7	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 0}	\N	2026-10-12 02:54:39.778
cmv4ns1zg0002lb1aedqrf1pa	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/edit	{"durationMs": 925}	\N	2026-10-12 02:54:27.34
cmv4nsbla0003lb1ae30aeka8	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 89435}	\N	2026-10-12 02:54:39.789
cmv4nsbsa0000xqtyz4tch96g	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	\N	\N	2026-10-12 02:54:40.012
cmv4nsr4g000c111qz6m5fkmm	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/cmphnhw8e0002so1uh16dwpvn/edit	{"durationMs": 32583}	\N	2026-10-12 02:54:59.918
cmv4nt7qp000d111qtfnpt1m4	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/cmphnhw8e0002so1uh16dwpvn/edit	{"durationMs": 1957}	\N	2026-10-12 02:55:21.458
cmv4ntlma000e111qu8j4k1tv	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 0}	\N	2026-10-12 02:55:39.441
cmv4ntlmh0001xqty49rn6vm1	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 59415}	\N	2026-10-12 02:55:39.448
cmv4ntlpb000f111qpahkkkzl	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	\N	\N	2026-10-12 02:55:39.552
cmv4ntwbp0000ucxvzjqini1v	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/cmphnhw8e0002so1uh16dwpvn/edit	{"durationMs": 3651}	\N	2026-10-12 02:55:53.318
cmv4nuh4z0002xqtyis5wj6f9	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/cmphnhw8e0002so1uh16dwpvn/edit	{"durationMs": 4662}	\N	2026-10-12 02:56:20.291
cmv4nuh5o0003xqtyvmwmq8m4	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	\N	\N	2026-10-12 02:56:20.317
cmv4numcu0004xqty7lp7xtk2	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 6741}	\N	2026-10-12 02:56:27.054
cmv4numcu0001ucxvfrn6mfr9	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/mam-xanh-hoc-duong-mt18obvz	\N	\N	2026-10-12 02:56:27.053
cmv4nuuqy0005xqtyj33arptn	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/campaigns/mam-xanh-hoc-duong-mt18obvz	{"durationMs": 10857}	\N	2026-10-12 02:56:37.929
cmv4nuus80002ucxvdx17pcdk	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	\N	\N	2026-10-12 02:56:37.976
cmv4nuvs10003ucxvfub8h8yd	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 1361}	\N	2026-10-12 02:56:39.266
cmv4nuz2c0006ucxv3acie7gp	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 0}	\N	2026-10-12 02:56:43.525
cmv4nuz2f0006xqtyf1jz33om	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 64079}	\N	2026-10-12 02:56:43.527
cmv4nuz4p000cvit7387ez9kn	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	\N	\N	2026-10-12 02:56:43.608
cmv4nvy0s0009xqtyocev04k4	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 0}	\N	2026-10-12 02:57:28.828
cmv4nvy1h000dvit7n4xqndk8	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 45224}	\N	2026-10-12 02:57:28.852
cmv4nxabp000evit72ilrpx8s	PAGE_VIEW	\N	\N	7679bb12-4b76-4adf-bcf4-1bcd07bdf7c3	/blog	\N	\N	2026-10-12 02:58:31.43
cmv4nxmw90003n9zr208xqn2f	PAGE_LEAVE	\N	\N	7679bb12-4b76-4adf-bcf4-1bcd07bdf7c3	/blog	{"durationMs": 0}	\N	2026-10-12 02:58:47.721
cmv4nxmwf0007ucxvwu1j0ack	PAGE_LEAVE	\N	\N	7679bb12-4b76-4adf-bcf4-1bcd07bdf7c3	/blog	{"durationMs": 16260}	\N	2026-10-12 02:58:47.726
cmv4nxmxk0008ucxvth335cqc	PAGE_VIEW	\N	\N	7679bb12-4b76-4adf-bcf4-1bcd07bdf7c3	/blog/qa-20261012-mv4nq083-blog-luu-nhap	\N	\N	2026-10-12 02:58:47.769
cmv4o04ns0000yl0vtdvegz4a	PAGE_LEAVE	\N	\N	7679bb12-4b76-4adf-bcf4-1bcd07bdf7c3	/blog/qa-20261012-mv4nq083-blog-luu-nhap	{"durationMs": 116209}	\N	2026-10-12 03:00:44.056
cmv4o04o80000do34bqooyxi9	PAGE_LEAVE	\N	\N	7679bb12-4b76-4adf-bcf4-1bcd07bdf7c3	/blog/qa-20261012-mv4nq083-blog-luu-nhap	{"durationMs": 0}	\N	2026-10-12 03:00:44.072
cmv4o04pb0001yl0vc0hp80za	PAGE_VIEW	\N	\N	7679bb12-4b76-4adf-bcf4-1bcd07bdf7c3	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	\N	\N	2026-10-12 03:00:44.111
cmv4o04y50001do34s6gu5mh6	PAGE_LEAVE	\N	\N	7679bb12-4b76-4adf-bcf4-1bcd07bdf7c3	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	{"durationMs": 333}	\N	2026-10-12 03:00:44.429
cmv4o04yo0002do34edfss3jn	PAGE_LEAVE	\N	\N	7679bb12-4b76-4adf-bcf4-1bcd07bdf7c3	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	{"durationMs": 1}	\N	2026-10-12 03:00:44.448
cmv4o05f8000031zug950gj0e	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 196182}	\N	2026-10-12 03:00:45.045
cmv4o05hn0002yl0vy7idzu2d	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	\N	\N	2026-10-12 03:00:45.128
cmv523wou0004kzj9aqk4fh6g	PAGE_VIEW	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/	\N	\N	2026-10-12 09:35:34.974
cmv4o05kv0000qvextdhhp1ma	PAGE_VIEW	\N	\N	7679bb12-4b76-4adf-bcf4-1bcd07bdf7c3	/blog/nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	\N	\N	2026-10-12 03:00:45.242
cmv4o2z4f000131zubkqfi9x7	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 9203}	\N	2026-10-12 03:02:56.845
cmv4o05ll0001qvexilfhgrpi	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	4f10473e-ccea-4d7c-a4b1-cf597915acc3	/blog/editor	{"durationMs": 0}	\N	2026-10-12 03:00:45.242
cmv4o0bpw0003do34bytoy47c	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 3051}	\N	2026-10-12 03:00:53.204
cmv4o2nz70002qvexu7892kod	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 2204}	\N	2026-10-12 03:02:42.403
cmv4o2z4n0004do34z3bnako7	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/chat	\N	\N	2026-10-12 03:02:56.853
cmv4o36lf0003qvex1jcn4rbu	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	\N	\N	2026-10-12 03:03:06.532
cmv4o36ln0005do34q4yzykdc	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/chat	{"durationMs": 9697}	\N	2026-10-12 03:03:06.54
cmv4o3coh000231zu1u1sl9e4	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 7878}	\N	2026-10-12 03:03:14.418
cmv4o3qx9000331zurjafku2z	PAGE_LEAVE	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/	{"durationMs": 6498}	\N	2026-10-12 03:03:32.876
cmv4o3qxf0004qvexb0vpsuvy	PAGE_VIEW	cmphnhw8e0002so1uh16dwpvn	\N	9b56d2e0-0e72-411b-af3e-1ca0ad6ee553	/profile/cmphnhw8e0002so1uh16dwpvn/edit	\N	\N	2026-10-12 03:03:32.882
cmv523hct0001kzj9pesxw1dp	PAGE_LEAVE	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/	{"durationMs": 86}	\N	2026-10-12 09:35:15.101
cmv523jj40002kzj9npez1scl	PAGE_VIEW	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/	\N	\N	2026-10-12 09:35:17.92
cmv523jxx0003kzj9fdatvie9	PAGE_LEAVE	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/	{"durationMs": 80}	\N	2026-10-12 09:35:18.453
cmv523wox0005kzj9hqs964mv	PAGE_LEAVE	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/	{"durationMs": 47}	\N	2026-10-12 09:35:34.978
cmv524n0g0006kzj9xbawhfe5	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f8b8ef20-c891-423c-800e-aa90fba1b0a9	/	\N	\N	2026-10-12 09:36:09.089
cmv524n1v0007kzj95cy6vyxx	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f8b8ef20-c891-423c-800e-aa90fba1b0a9	/	{"durationMs": 59}	\N	2026-10-12 09:36:09.139
cmv528fs40008kzj94bwx3i2h	PAGE_VIEW	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/	\N	\N	2026-10-12 09:39:06.341
cmv528j6h0009kzj99sym41o4	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	f8b8ef20-c891-423c-800e-aa90fba1b0a9	/	\N	\N	2026-10-12 09:39:10.745
cmv52ajss000akzj9buec1qph	PAGE_LEAVE	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/	{"durationMs": 98954}	\N	2026-10-12 09:40:44.86
cmv52ajsx000bkzj9cfm4ly4i	PAGE_LEAVE	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/	{"durationMs": 0}	\N	2026-10-12 09:40:44.865
cmv52an7f000ckzj9m8oac3wm	PAGE_VIEW	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/campaigns	\N	\N	2026-10-12 09:40:49.275
cmv52avnx000dkzj94edlwy28	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	903290c3-58f3-4269-be22-d3702d82ab87	/campaigns	\N	\N	2026-10-12 09:41:00.237
cmv52axx2000ekzj91rgex96q	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	903290c3-58f3-4269-be22-d3702d82ab87	/campaigns	{"durationMs": 3766}	\N	2026-10-12 09:41:03.158
cmv52axxw000fkzj9pmyk5oh5	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	903290c3-58f3-4269-be22-d3702d82ab87	/	\N	\N	2026-10-12 09:41:03.188
cmv52b8dk000gkzj9n5mxhfzy	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	903290c3-58f3-4269-be22-d3702d82ab87	/	{"durationMs": 13412}	\N	2026-10-12 09:41:16.711
cmv52b8ec000hkzj9v6hb925j	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	903290c3-58f3-4269-be22-d3702d82ab87	/gioi-thieu	\N	\N	2026-10-12 09:41:16.741
cmv52bgoi000ikzj9n5dqmm8n	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	903290c3-58f3-4269-be22-d3702d82ab87	/gioi-thieu	{"durationMs": 10881}	\N	2026-10-12 09:41:27.475
cmv52bgp7000jkzj9uwf3kzne	PAGE_VIEW	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	903290c3-58f3-4269-be22-d3702d82ab87	/projects	\N	\N	2026-10-12 09:41:27.499
cmv52bngq000kkzj9yfzzdk95	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	903290c3-58f3-4269-be22-d3702d82ab87	/projects	{"durationMs": 9017}	\N	2026-10-12 09:41:36.266
cmv52gnsf000lkzj90xbo3yvg	PAGE_LEAVE	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/campaigns	{"durationMs": 281557}	\N	2026-10-12 09:45:29.967
cmv52irms000mkzj95mfzyglk	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	903290c3-58f3-4269-be22-d3702d82ab87	/projects	{"durationMs": 6451}	\N	2026-10-12 09:47:08.261
cmv52irmw000nkzj96s4qlcyi	PAGE_LEAVE	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	\N	903290c3-58f3-4269-be22-d3702d82ab87	/projects	{"durationMs": 0}	\N	2026-10-12 09:47:08.265
cmv52iuhx000okzj9hmoevh3u	PAGE_VIEW	\N	\N	4d413b17-7604-4b30-8428-7bef8427e020	/campaigns	\N	\N	2026-10-12 09:47:11.974
\.


--
-- Data for Name: analytics_settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.analytics_settings (id, "ttlDays", "updatedBy", "updatedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: assistant_telemetry_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assistant_telemetry_events (id, assistant, "eventType", metadata, "createdAt") FROM stdin;
cmt3a7fi10000j31yvmpqrku1	platform-help	answer_rendered	{"hasAction": true, "contextTraceCount": 0}	2026-08-21 18:27:19.216
cmt6t0kp90000vkkb2jh5nre9	platform-help	opened	{"contextTraceCount": 3}	2026-08-24 05:37:10.579
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.audit_logs (id, "userId", action, "entityType", "entityId", "oldValue", "newValue", changes, "ipAddress", "userAgent", reason, metadata, "createdAt") FROM stdin;
\.


--
-- Data for Name: backer_invoices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.backer_invoices (id, "invoiceNumber", "pledgeId", "backerName", "backerEmail", "backerPhone", "backerAddress", "backerTaxCode", "companyName", amount, "tipAmount", "platformFee", "vatAmount", "totalAmount", "campaignTitle", "paymentMethod", "transactionId", status, "issuedAt", "pdfUrl", "sentAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: badges; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.badges (id, name, slug, description, icon_url, icon_name, color, background_color, type, rarity, is_active, created_by, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: blacklist; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blacklist (id, type, value, reason, "addedBy", "isActive", "expiresAt", "createdAt", "updatedAt") FROM stdin;
a90b1a0b-7c9f-4c20-965e-5f71a09ea732	WORD	lồn	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
520aa2e4-4114-4649-bdff-fbc2f100bcf7	WORD	cặc	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
a91022d1-c602-4d8c-ba81-12b8a10f569d	WORD	buồi	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
8f2ad07d-5789-4d90-a107-c23ea2bab91c	WORD	đĩ	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
2bbe19df-7ce7-4dba-8cfb-553dcec2a8b0	WORD	điếm	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
4d27c99f-7b9f-406b-86fa-8408c84f784e	WORD	đụ	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
ff18edf7-9d72-4040-aa97-e6f8a4165717	WORD	địt	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
0ffe98c9-3385-47a5-a720-4229f3b511c8	WORD	đéo	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
69b5baf8-0c7d-4e4e-ba08-f19277ea44b0	WORD	đmm	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
08f92da5-68dc-4f42-a512-6b60a49482a1	WORD	đcm	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
12b3e8af-5f67-4d6e-a8ff-1b974a343afc	WORD	vcl	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
418335f7-f07b-40e9-a4fa-b5b22b7f0385	WORD	clgt	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
9451dadd-5b07-468c-840b-09be3f7b2224	WORD	cmm	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
a308006b-c9e8-4596-b5a2-2e61e8651b29	WORD	dmm	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
8bdc5570-161a-412f-9578-e5e542ae8597	WORD	fuck	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
69514943-d990-4216-a7db-c8f2745cfa6a	WORD	shit	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
e4fdeab2-0c8b-4d42-9615-6969117a8267	WORD	bitch	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
4e1527e5-c95e-4c3a-8e83-187bcc1b7abc	WORD	asshole	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
f49cbfb3-3e85-418f-af56-b845f1d01e79	WORD	pussy	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
1d5f7cfa-fa62-4841-9198-5f784f3c38b0	WORD	dick	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
97099297-73f0-4dcb-aa3e-868395180c07	WORD	whore	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
b187a3fd-f3a6-4a43-a6df-494a58f8bcd8	WORD	slut	Từ tục	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
7a20a41f-d9dd-4397-b7b2-35b48da122a0	WORD	porn	Nội dung khiêu dâm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
c8470b9b-2ee1-4fb6-886e-1375a831acca	WORD	xxx	Nội dung khiêu dâm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
e69b3ae4-d6b9-4f19-9e7c-a050e770859b	WORD	sex tape	Nội dung khiêu dâm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
619b54d0-9322-492a-b73c-496c73cee1f2	WORD	khiêu dâm	Nội dung khiêu dâm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
03eafaf6-3172-4b08-9c38-d35e759db4e5	WORD	sextoy	Nội dung khiêu dâm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
27f805e7-8b97-42e9-9fae-688f7cbc9f69	WORD	gái gọi	Nội dung khiêu dâm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
c804af6b-271f-4106-9f52-1e588d1033c0	WORD	bán dâm	Nội dung khiêu dâm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
bb83685c-8c21-491c-aedc-d23dcddba907	WORD	cờ bạc	Cờ bạc / cá độ	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
380923cf-6961-4d32-ba35-985c126d77a2	WORD	cá độ	Cờ bạc / cá độ	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
d17583f0-58a2-4492-9536-c5b53d82a962	WORD	đánh bạc	Cờ bạc / cá độ	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
fb127ea3-a25d-4882-8915-4d69ff867538	WORD	casino	Cờ bạc / cá độ	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
485f9247-4052-4103-b768-1ced81921df4	WORD	lô đề	Cờ bạc / cá độ	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
7c7b57be-c5de-473a-80ff-5c57664fa18a	WORD	ma túy	Chất cấm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
0c4dda3a-7d94-48d1-8492-08c024e87acc	WORD	ma tuý	Chất cấm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
067f5bfb-7f70-4ea5-aefb-6ef453ac1d70	WORD	heroin	Chất cấm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
22afdcab-6bc4-48d7-a816-eb3fd491f006	WORD	cocaine	Chất cấm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
63ee6b51-fa0e-4d6a-ae76-e722a8e903b3	WORD	cần sa	Chất cấm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
cd70ce3c-9d28-4045-98a3-6c9d416ba4a7	WORD	thuốc lắc	Chất cấm	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
49c2c0cf-883f-4428-a12b-06a6222c410c	WORD	súng đạn	Vũ khí	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
026c41e5-9c55-4b27-9429-caf9ae848142	WORD	đa cấp	Lừa đảo / đa cấp	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
dacc143d-5c33-4d07-b7c4-27ca159568f0	WORD	ponzi	Lừa đảo / đa cấp	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
3705f631-dba7-4e7a-8a0d-5bd74cd15f8d	WORD	lùa gà	Lừa đảo	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
daa47dcb-bc4a-4778-a69a-8cdfa4cd275a	WORD	tín dụng đen	Cho vay nặng lãi	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
021ddaaa-1088-4fe3-aeac-36498fe12607	WORD	nặng lãi	Cho vay nặng lãi	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
6fac3270-f159-47d9-94f1-da925425d3d3	WORD	rửa tiền	Tội phạm tài chính	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:25.089	2026-09-04 11:18:25.004
92d5b0e1-1588-44e0-abc9-08d19077820c	WORD	cc	Từ ngữ không phù hợp	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:18:59.837	2026-09-04 11:18:59.716
7ecb28b3-1536-45ef-8015-ae7730395e13	WORD	cl	Từ ngữ không phù hợp	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:19:41.857	2026-09-04 11:19:41.851
30d591dc-a8a7-4a1f-ab3b-e48627b612d8	WORD	vũ khí	Vũ khí	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	t	\N	2026-09-04 11:20:47.743	2026-09-04 11:20:47.741
\.


--
-- Data for Name: blog_bookmarks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_bookmarks (id, "postId", "userId", "createdAt") FROM stdin;
\.


--
-- Data for Name: blog_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_categories (id, name, slug, description, "createdAt") FROM stdin;
\.


--
-- Data for Name: blog_comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_comments (id, "postId", "userId", "parentId", content, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: blog_drafts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_drafts (id, "postId", "authorId", "titleSnapshot", "excerptSnapshot", "contentSnapshot", "richContentSnapshot", "autosavedAt") FROM stdin;
\.


--
-- Data for Name: blog_likes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_likes (id, "postId", "userId", "createdAt") FROM stdin;
\.


--
-- Data for Name: blog_post_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_post_categories ("postId", "categoryId") FROM stdin;
\.


--
-- Data for Name: blog_post_tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_post_tags ("postId", "tagId") FROM stdin;
\.


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_posts (id, "authorId", "campaignId", "projectId", "mongoContentId", title, slug, excerpt, "coverImage", status, type, visibility, "publishedAt", "createdAt", "updatedAt", "deletedAt", "viewCount", "likeCount", "commentCount", "bookmarkCount", "isFeatured", "wordCount", "readingTimeMinutes", content) FROM stdin;
7a180e27-c300-4871-99e4-954e6c1e4b8a	cmphnhw8e0002so1uh16dwpvn	62c0e6a0-0765-4615-871d-f2378232e5ec	cmt71iinf0005y4v2ybu264dk	\N	[FIXTURE-2026] Tác động sau 100 ngày	tac-dong-sau-100-ngay-1787564120342-6skdw	Tóm tắt fixture: Tác động sau 100 ngày.	https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82	PUBLISHED	IMPACT_REPORT	PUBLIC	2026-08-21 09:34:56.763	2026-08-24 09:35:20.343	2026-08-24 09:34:56.763	\N	40	6	2	2	f	280	4	# Tác động sau 100 ngày\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 3 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.
47692a8a-d5ec-46d7-bdf0-505c2eebc9e9	cmphnhw8e0002so1uh16dwpvn	065955fc-3da0-4d92-aac8-b6d8d80c201d	cmt71iinf0005y4v2ybu264dk	\N	[FIXTURE-2026] Hướng dẫn nhận sản phẩm số	huong-dan-nhan-san-pham-so-1787564123531-0e9kj	Tóm tắt fixture: Hướng dẫn nhận sản phẩm số.	https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82	PUBLISHED	PLATFORM	PUBLIC	2026-08-15 09:34:56.763	2026-08-24 09:35:23.532	2026-08-24 09:34:56.763	\N	142	24	0	2	t	460	4	# Hướng dẫn nhận sản phẩm số\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 9 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.
e5a41e10-9ff8-4f1c-a14d-5a664ea7ca97	92df92ff-0f15-469f-9f24-99b44984bd13	820e8529-0d51-4631-b0d4-f5f810c85429	cmt71iitr0007y4v2ogyi0ib3	\N	[FIXTURE-2026] Thông báo mở đăng ký workshop	thong-bao-mo-dang-ky-workshop-1787564121024-yv9n5	Tóm tắt fixture: Thông báo mở đăng ký workshop.	https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=82	PENDING_REVIEW	ANNOUNCEMENT	PUBLIC	\N	2026-08-24 09:35:21.026	2026-08-24 09:34:56.763	\N	51	9	3	0	f	310	5	# Thông báo mở đăng ký workshop\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 4 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.
2880cfff-a335-452b-befa-64894512f2a9	cmphnhw8e0002so1uh16dwpvn	9d1680c1-b6b6-4817-86ce-edf7a63a8a57	cmt71ij030009y4v24x3m6vo0	\N	[FIXTURE-2026] Câu chuyện của một họa sĩ trẻ	cau-chuyen-cua-mot-hoa-si-tre-1787564121708-k3hs0	Tóm tắt fixture: Câu chuyện của một họa sĩ trẻ.	https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=82	ARCHIVED	STORY	PUBLIC	\N	2026-08-24 09:35:21.71	2026-08-24 09:34:56.763	\N	68	12	0	1	t	340	6	# Câu chuyện của một họa sĩ trẻ\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 5 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.
58726acb-258c-4680-afe9-514c90254578	92df92ff-0f15-469f-9f24-99b44984bd13	4d77b180-6d10-43ff-abc7-37afb11aec67	cmt71iih30003y4v2q7dc76vx	\N	[FIXTURE-2026] Bản tin tiến độ tháng này	ban-tin-tien-do-thang-nay-1787564119653-oq9pk	Tóm tắt fixture: Bản tin tiến độ tháng này.	https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=82	DRAFT	CAMPAIGN_UPDATE	OWNER_ONLY	\N	2026-08-24 09:35:19.657	2026-08-24 09:34:56.763	\N	17	3	1	1	f	250	3	# Bản tin tiến độ tháng này\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 2 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.
e87b5ec3-5116-4560-8665-ccc0c15c17b2	92df92ff-0f15-469f-9f24-99b44984bd13	adbdecb6-241a-4266-a8c5-5d4e8ae60298	cmt71iih30003y4v2q7dc76vx	\N	[FIXTURE-2026] Lời cảm ơn cộng đồng	loi-cam-on-cong-dong-1787564122848-ilkqp	Tóm tắt fixture: Lời cảm ơn cộng đồng.	https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=82	PUBLISHED	ANNOUNCEMENT	BACKERS_ONLY	2026-08-16 09:34:56.763	2026-08-24 09:35:22.849	2026-08-24 09:34:56.763	\N	119	21	3	1	f	430	3	# Lời cảm ơn cộng đồng\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 8 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.
3561e6eb-7a1c-4b11-b2a7-5c0a5b8bbf88	cmphnhw8e0002so1uh16dwpvn	\N	\N	\N	[FIXTURE-2026] Bản nháp kế hoạch mùa thu	ban-nhap-ke-hoach-mua-thu-1787564122620-zc0fx	Tóm tắt fixture: Bản nháp kế hoạch mùa thu.	https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=82	DRAFT	PLATFORM	PRIVATE	\N	2026-08-24 09:35:22.621	2026-08-24 09:34:56.763	\N	103	18	2	0	f	400	2	# Bản nháp kế hoạch mùa thu\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 7 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.
e45e36b2-b7e4-42b5-b15b-cddec3be6c68	92df92ff-0f15-469f-9f24-99b44984bd13	\N	\N	\N	[FIXTURE-2026] Bài viết độc lập về sống xanh	bai-viet-doc-lap-ve-song-xanh-1787564122392-mhh5t	Tóm tắt fixture: Bài viết độc lập về sống xanh.	https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82	PUBLISHED	PLATFORM	PUBLIC	2026-08-18 09:34:56.763	2026-08-24 09:35:22.393	2026-08-24 09:34:56.763	\N	87	15	1	2	f	370	7	# Bài viết độc lập về sống xanh\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 6 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.
69f8a5d9-0b06-447e-a213-d4fc3e20c138	92df92ff-0f15-469f-9f24-99b44984bd13	7d05d3ce-a49a-48c8-8294-c2d5c0fb4b00	cmt71iitr0007y4v2ogyi0ib3	\N	[FIXTURE-2026] Báo cáo minh bạch gây quỹ	bao-cao-minh-bach-gay-quy-1787564124214-ye5mq	Tóm tắt fixture: Báo cáo minh bạch gây quỹ.	https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=82	REJECTED	IMPACT_REPORT	OWNER_ONLY	\N	2026-08-24 09:35:24.215	2026-08-24 09:34:56.763	\N	153	27	1	0	f	490	5	# Báo cáo minh bạch gây quỹ\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 10 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.
de9194b3-c31d-4e95-91ee-2648cb4c0481	cmphnhw8e0002so1uh16dwpvn	\N	cmt0y1lls000196jc66m2pj7t	\N	Hành trình Mầm xanh tử tế: Từ hạt giống đến rừng cây	hanh-trinh-mam-xanh-tu-te	Mầm xanh tử tế là dự án gây quỹ cộng đồng nhằm trồng và phủ xanh các trường học vùng khó khăn. Cùng xem hành trình của chúng tôi từ hạt giống đến rừng cây.	\N	PUBLISHED	PLATFORM	PUBLIC	2026-08-20 04:43:40.082	2026-08-20 04:43:40.083	2026-08-20 04:43:40.082	\N	26	0	0	0	f	473	1	{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Hành trình Mầm xanh tử tế: Từ hạt giống đến rừng cây"}]},{"type":"paragraph","content":[{"type":"text","text":"Mầm xanh tử tế là dự án gây quỹ cộng đồng nhằm trồng và phủ xanh các trường học vùng khó khăn. Bài viết này chia sẻ hành trình của chúng tôi từ ngày đầu tiên và những điều sắp tới sẽ làm."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Vì sao chúng tôi bắt đầu?"}]},{"type":"paragraph","content":[{"type":"text","text":"Chúng tôi tin rằng mỗi hạt giống gieo xuống hôm nay sẽ là một bóng mát cho thế hệ tương lai. Trẻ em vùng cao deserve một sân trường rợp bóng cây, nơi các em có thể học tập, vui chơi trong không gian xanh mát. Với sự chung tay của cộng đồng Tử Tế Fund, chúng tôi mong muốn mang cây xanh đến 100 trường học trong 3 năm tới."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sản phẩm gây quỹ chính thức"}]},{"type":"paragraph","content":[{"type":"text","text":"Để đồng hành cùng dự án, chúng tôi ra mắt bộ sản phẩm "},{"type":"text","text":"Bộ hạt giống cây xanh tử tế","marks":[{"type":"bold"}]},{"type":"text","text":" — gồm 5 loại cây: hoa mười giờ, hoa chiều tím, rau mầm, bạc hà và hướng thảo. Kèm đất dinh dưỡng, chậu giấy phân hủy sinh học và hướng dẫn trồng chi tiết. Mỗi bộ bạn nhận về là một mầm sống được gieo trồng tại chính gia đình bạn, và đóng góp của bạn sẽ được dùng để phủ xanh các trường học vùng khó khăn."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Mỗi người trồng một cây, một triệu người trồng một triệu cây. Sự tử tế sẽ lớn lên cùng những mầm xanh."}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Kế hoạch tiếp theo"}]},{"type":"paragraph","content":[{"type":"text","text":"Trong thời gian tới, chúng tôi sẽ tổ chức các buổi trồng cây cộng đồng, mời các bạn backer cùng tham gia và theo dõi tiến độ phủ xanh tại từng trường học qua các báo cập nhật định kỳ. Cảm ơn bạn đã đồng hành cùng hành trình Mầm xanh tử tế!"}]}]}
b4dac6f6-fedf-43de-8fb9-c02546defd86	cmphnhw8e0002so1uh16dwpvn	\N	\N	6a889a04af3b2d9abf9ea50b	đè	de	dsffdsfdfds	\N	PENDING_REVIEW	STORY	PUBLIC	\N	2026-08-21 18:33:40.226	2026-08-21 18:33:40.225	\N	5	0	0	0	f	9	1	<p>fsfsfsdfs</p><div class="callout callout-info" data-variant="warning" data-type="callout"><p>sđsfdfdfs</p><p></p></div>
bd34db8f-36c7-41a5-8462-89ea931f34f3	cmphnhw8e0002so1uh16dwpvn	\N	\N	\N	qa-20261012-mv4nq083 Blog luu nhap	qa-20261012-mv4nq083-blog-luu-nhap			DRAFT	STORY	PUBLIC	\N	2026-10-12 02:53:08.813	2026-10-12 02:57:28.443	\N	0	0	0	0	f	9	1	<p>Noi dung goc qa-20261012-mv4nq083</p><p>Dong sua duoc luu thu cong.</p>
29e5fe62-267a-4e4c-bc4c-2f7d64ccf8c7	cmphnhw8e0002so1uh16dwpvn	5cfeef34-e2c8-4769-ba33-0c69fd903897	cmt71ii4d0001y4v2wo8sxbf9	\N	[FIXTURE-2026] Nhật ký gieo mầm tuần đầu	nhat-ky-gieo-mam-tuan-dau-1787564118281-idsso	Tóm tắt fixture: Nhật ký gieo mầm tuần đầu.	https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=82	PUBLISHED	STORY	PUBLIC	2026-08-23 09:34:56.763	2026-08-24 09:35:18.282	2026-08-24 09:34:56.763	\N	14	0	0	0	t	220	2	# Nhật ký gieo mầm tuần đầu\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 1 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.
\.


--
-- Data for Name: blog_reports; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_reports (id, "postId", "commentId", "reporterId", reason, description, status, "reviewedBy", "reviewedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: blog_tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_tags (id, name, slug) FROM stdin;
\.


--
-- Data for Name: blog_versions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_versions (id, "postId", "versionNumber", "authorId", "titleSnapshot", "excerptSnapshot", "contentSnapshot", "richContentSnapshot", "changeNote", "createdAt") FROM stdin;
\.


--
-- Data for Name: blog_view_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_view_logs (id, "postId", "userId", ip, "userAgent", "viewedAt") FROM stdin;
\.


--
-- Data for Name: campaign_blog_links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_blog_links (id, "campaignId", "blogPostId", "order", "createdAt") FROM stdin;
\.


--
-- Data for Name: campaign_comment_reactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_comment_reactions (id, "commentId", "userId", type, "createdAt") FROM stdin;
\.


--
-- Data for Name: campaign_comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_comments (id, "campaignId", "userId", "userName", "userAvatar", content, "parentId", depth, "isEdited", "isDeleted", status, "replyCount", "editHistory", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: campaign_contents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_contents (id, "campaignId", "lastSavedBy", version, sections, "mediaGallery", "customFields", "isDraft", "publishedAt", "versionHistory", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: campaign_followers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_followers (id, "campaignId", "userId", email, "createdAt") FROM stdin;
\.


--
-- Data for Name: campaign_reports; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_reports (id, "campaignId", "userId", reason, description, status, "resolvedAt", "resolvedBy", resolution, "createdAt", "updatedAt", "imageUrls", "occurredAt", "targetType", "targetId", "targetTitle", "targetHref") FROM stdin;
\.


--
-- Data for Name: campaign_updates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_updates (id, "campaignId", title, content, "imageUrl", "createdAt", "isPinned", tags, "updatedAt") FROM stdin;
de59cb15-8dcf-4090-b65a-c49ab6070fcb	71d24f68-f9aa-4a6f-b42a-409b1ab4cb43	Chính thức khởi động chiến dịch!	Cảm ơn cộng đồng TửTế Fund đã đồng hành. Chúng tôi vừa hoàn tất thủ tục với các trường đối tác và sẵn sàng triển khai đợt trồng cây đầu tiên vào tháng 9.	\N	2026-08-20 08:08:57.011	f	{}	2026-08-20 08:08:57.011
\.


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaigns (id, "campaignCode", slug, title, description, "longDescription", "videoUrl", "imageUrl", type, category, tags, "goalAmount", "currentAmount", status, "startDate", "endDate", "creatorId", "projectId", "feeRate", "createdAt", "updatedAt", images, "closedAmount", "closedAt", "isFeatured", "fundingModel", "fulfillmentConfirmedAt") FROM stdin;
71d24f68-f9aa-4a6f-b42a-409b1ab4cb43	MX-2026-6643	mam-xanh-hoc-duong-mt18obvz	Một cây xanh cho mỗi lớp học	Chiến dịch trồng 500 cây xanh tại 10 trường tiểu học vùng khó khăn. Mỗi cây xanh sẽ giúp các em có bóng mát và không gian học tập trong lành hơn.	Trong năm học 2026-2027, chúng tôi hướng tới việc phủ xanh sân trường tại 10 trường tiểu học ở các vùng khó khăn. Với mỗi 100.000 đồng đóng góp, một cây xanh sẽ được trồng và chăm sóc trong 2 năm đầu. Các trường sẽ được chọn theo tiêu chí: thiếu cây xanh, diện tích sân chơi hạn chế, và học sinh thuộc gia đình khó khăn.	\N	https://res.cloudinary.com/ds6p3pr28/image/upload/v1789965878/crowdfund-vn/hwryr92ugn8n00tpwt5y.png	REWARD	Môi trường	{bao-ton,bao-ve-moi-truong,renewable-energy}	50000000.000000000000000000000000000000	0.000000000000000000000000000000	ACTIVE	2026-08-20 08:08:56.112	2026-10-19 00:00:00	cmphnhw8e0002so1uh16dwpvn	cmt0y1lls000196jc66m2pj7t	0.08	2026-08-20 08:08:56.113	2026-08-20 08:08:56.112	{https://res.cloudinary.com/ds6p3pr28/image/upload/v1789965878/crowdfund-vn/hwryr92ugn8n00tpwt5y.png}	\N	\N	f	ALL_OR_NOTHING	\N
5cfeef34-e2c8-4769-ba33-0c69fd903897	FIX-1787564105656-0	trong-1-000-cay-quanh-truong-hoc-1787564105656-hkf0j	[FIXTURE-2026] Trồng 1.000 cây quanh trường học	Chiến dịch kiểm thử: Trồng 1.000 cây quanh trường học.	# Trồng 1.000 cây quanh trường học\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 1 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=82	REWARD	Môi trường	{fixture,active,community}	80000000.000000000000000000000000000000	52000000.000000000000000000000000000000	SUCCESS	2026-08-12 09:34:56.763	2026-09-18 09:34:56.763	cmphnhw8e0002so1uh16dwpvn	cmt71ii4d0001y4v2wo8sxbf9	0.08	2026-08-24 09:35:05.665	2026-09-19 01:11:10.115	{}	52000000.000000000000000000000000000000	2026-09-19 01:11:10.115	f	ALL_OR_NOTHING	\N
4d77b180-6d10-43ff-abc7-37afb11aec67	FIX-1787564106124-1	bo-loc-nuoc-cho-ban-lang-1787564106124-kajm1	[FIXTURE-2026] Bộ lọc nước cho bản làng	Chiến dịch kiểm thử: Bộ lọc nước cho bản làng.	# Bộ lọc nước cho bản làng\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 2 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=82	REWARD	Công nghệ	{fixture,pending_review,preorder}	120000000.000000000000000000000000000000	0.000000000000000000000000000000	PENDING_REVIEW	2026-08-27 09:34:56.763	2026-10-08 09:34:56.763	92df92ff-0f15-469f-9f24-99b44984bd13	cmt71iih30003y4v2q7dc76vx	0.08	2026-08-24 09:35:06.125	2026-08-24 09:34:56.763	{}	\N	\N	f	ALL_OR_NOTHING	\N
820e8529-0d51-4631-b0d4-f5f810c85429	FIX-1787564106583-3	in-thu-nghiem-500-ban-truyen-1787564106583-fzjp8	[FIXTURE-2026] In thử nghiệm 500 bản truyện	Chiến dịch kiểm thử: In thử nghiệm 500 bản truyện.	# In thử nghiệm 500 bản truyện\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 4 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=82	REWARD	Cộng đồng	{fixture,draft,preorder}	70000000.000000000000000000000000000000	0.000000000000000000000000000000	DRAFT	2026-09-03 09:34:56.763	2026-10-23 09:34:56.763	92df92ff-0f15-469f-9f24-99b44984bd13	cmt71iitr0007y4v2ogyi0ib3	0.08	2026-08-24 09:35:06.584	2026-08-24 09:34:56.763	{}	\N	\N	f	ALL_OR_NOTHING	\N
9d1680c1-b6b6-4817-86ce-edf7a63a8a57	FIX-1787564106812-4	phong-may-tinh-luu-dong-1787564106812-9bs0w	[FIXTURE-2026] Phòng máy tính lưu động	Chiến dịch kiểm thử: Phòng máy tính lưu động.	# Phòng máy tính lưu động\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 5 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=82	REWARD	Môi trường	{fixture,success,community}	200000000.000000000000000000000000000000	238000000.000000000000000000000000000000	SUCCESS	2026-04-26 09:34:56.763	2026-06-25 09:34:56.763	cmphnhw8e0002so1uh16dwpvn	cmt71ij030009y4v24x3m6vo0	0.08	2026-08-24 09:35:06.813	2026-08-24 09:34:56.763	{}	238000000.000000000000000000000000000000	\N	f	ALL_OR_NOTHING	\N
21e72a37-afe0-4cd0-8a5a-fdeff50d033a	FIX-1787564107040-5	ngay-hoi-ky-nang-so-1787564107040-ly73z	[FIXTURE-2026] Ngày hội kỹ năng số	Chiến dịch kiểm thử: Ngày hội kỹ năng số.	# Ngày hội kỹ năng số\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 6 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=82	REWARD	Công nghệ	{fixture,failed,preorder}	60000000.000000000000000000000000000000	17000000.000000000000000000000000000000	FAILED	2026-04-26 09:34:56.763	2026-07-15 09:34:56.763	92df92ff-0f15-469f-9f24-99b44984bd13	cmt71ij6i000by4v24132igx3	0.08	2026-08-24 09:35:07.041	2026-08-24 09:34:56.763	{}	17000000.000000000000000000000000000000	\N	f	ALL_OR_NOTHING	\N
a022b4c2-6e72-4e9c-9098-e93eedf65bed	FIX-1787564107268-6	suat-an-sang-thang-9-1787564107268-pdtnu	[FIXTURE-2026] Suất ăn sáng tháng 9	Chiến dịch kiểm thử: Suất ăn sáng tháng 9.	# Suất ăn sáng tháng 9\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 7 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=82	REWARD	Giáo dục	{fixture,active,community}	90000000.000000000000000000000000000000	67000000.000000000000000000000000000000	SUCCESS	2026-08-04 09:34:56.763	2026-09-03 09:34:56.763	cmphnhw8e0002so1uh16dwpvn	cmt71ii4d0001y4v2wo8sxbf9	0.08	2026-08-24 09:35:07.27	2026-09-12 01:11:10.345	{}	67000000.000000000000000000000000000000	2026-09-12 01:11:10.345	f	ALL_OR_NOTHING	\N
62c0e6a0-0765-4615-871d-f2378232e5ec	FIX-1787564106353-2	tap-1-nguoi-giu-lua-1787564106353-czit4	[FIXTURE-2026] Tập 1: Người giữ lửa	Chiến dịch kiểm thử: Tập 1: Người giữ lửa.	# Tập 1: Người giữ lửa\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 3 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=82	REWARD	Giáo dục	{fixture,active,community}	150000000.000000000000000000000000000000	103000000.000000000000000000000000000000	SUCCESS	2026-08-20 09:34:56.763	2026-09-11 09:34:56.763	cmphnhw8e0002so1uh16dwpvn	cmt71iinf0005y4v2ybu264dk	0.08	2026-08-24 09:35:06.355	2026-09-12 01:11:10.345	{}	103000000.000000000000000000000000000000	2026-09-12 01:11:10.345	f	ALL_OR_NOTHING	\N
065955fc-3da0-4d92-aac8-b6d8d80c201d	FIX-1787564107725-8	album-mam-sang-1787564107725-3c1kg	[FIXTURE-2026] Album Mầm sáng	Chiến dịch kiểm thử: Album Mầm sáng.	# Album Mầm sáng\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 9 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=82	REWARD	Môi trường	{fixture,active,community}	180000000.000000000000000000000000000000	41000000.000000000000000000000000000000	ACTIVE	2026-08-17 09:34:56.763	2026-10-13 09:34:56.763	cmphnhw8e0002so1uh16dwpvn	cmt71iinf0005y4v2ybu264dk	0.08	2026-08-24 09:35:07.726	2026-08-24 09:34:56.763	{}	\N	\N	f	ALL_OR_NOTHING	\N
57bc2747-1432-4d52-b866-a9bcfdf19478	FIX-1787564108182-10	vuon-rau-khong-rac-thai-1787564108182-5kp00	[FIXTURE-2026] Vườn rau không rác thải	Chiến dịch kiểm thử: Vườn rau không rác thải.	# Vườn rau không rác thải\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 11 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=82	REWARD	Giáo dục	{fixture,success,community}	95000000.000000000000000000000000000000	112000000.000000000000000000000000000000	SUCCESS	2026-02-25 09:34:56.763	2026-05-16 09:34:56.763	cmphnhw8e0002so1uh16dwpvn	cmt71ij030009y4v24x3m6vo0	0.08	2026-08-24 09:35:08.183	2026-08-24 09:34:56.763	{}	112000000.000000000000000000000000000000	\N	f	ALL_OR_NOTHING	\N
ea5afccd-8803-453a-acca-3243d2a20ec0	FIX-1787564108410-11	he-thong-tuoi-nho-giot-1787564108410-tdk5u	[FIXTURE-2026] Hệ thống tưới nhỏ giọt	Chiến dịch kiểm thử: Hệ thống tưới nhỏ giọt.	# Hệ thống tưới nhỏ giọt\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 12 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=82	REWARD	Cộng đồng	{fixture,draft,preorder}	130000000.000000000000000000000000000000	0.000000000000000000000000000000	DRAFT	2026-09-13 09:34:56.763	2026-11-12 09:34:56.763	92df92ff-0f15-469f-9f24-99b44984bd13	cmt71ij6i000by4v24132igx3	0.08	2026-08-24 09:35:08.411	2026-08-24 09:34:56.763	{}	\N	\N	f	ALL_OR_NOTHING	\N
7d05d3ce-a49a-48c8-8294-c2d5c0fb4b00	FIX-1787564107953-9	workshop-phong-thu-mien-phi-1787564107953-0w5jn	[FIXTURE-2026] Workshop phòng thu miễn phí	Chiến dịch kiểm thử: Workshop phòng thu miễn phí.	# Workshop phòng thu miễn phí\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 10 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=82	REWARD	Công nghệ	{fixture,pending_review,preorder}	50000000.000000000000000000000000000000	1500000.000000000000000000000000000000	SUCCESS	2026-08-31 09:34:56.763	2026-09-28 09:34:56.763	92df92ff-0f15-469f-9f24-99b44984bd13	cmt71iitr0007y4v2ogyi0ib3	0.08	2026-08-24 09:35:07.954	2026-09-29 01:11:09.389	{}	1500000.000000000000000000000000000000	2026-09-29 01:11:09.389	f	ALL_OR_NOTHING	\N
adbdecb6-241a-4266-a8c5-5d4e8ae60298	FIX-1787564107497-7	tu-lanh-cong-dong-1787564107497-c8ouv	[FIXTURE-2026] Tủ lạnh cộng đồng	Chiến dịch kiểm thử: Tủ lạnh cộng đồng.	# Tủ lạnh cộng đồng\n\nĐây là nội dung fixture để kiểm thử hiển thị bài viết, trạng thái, liên kết sản phẩm và điều hướng trong nền tảng. Bài viết số 8 có đủ đoạn văn dài để kiểm tra typography, ảnh bìa, sản phẩm nhúng và chế độ hiển thị.\n\n## Câu chuyện phía sau\n\nĐội ngũ cập nhật tiến độ minh bạch, chia sẻ kết quả và ghi nhận đóng góp của cộng đồng. Nội dung này chỉ phục vụ môi trường kiểm thử.	\N	https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=82	REWARD	Cộng đồng	{fixture,canceled,preorder}	110000000.000000000000000000000000000000	24000000.000000000000000000000000000000	SUCCESS	2026-05-26 09:34:56.763	2026-08-04 09:34:56.763	92df92ff-0f15-469f-9f24-99b44984bd13	cmt71iih30003y4v2q7dc76vx	0.08	2026-08-24 09:35:07.498	2026-09-12 01:11:10.345	{}	24000000.000000000000000000000000000000	2026-09-12 01:11:10.345	f	ALL_OR_NOTHING	\N
\.


--
-- Data for Name: chat_reports; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.chat_reports (id, "conversationId", "messageId", "reporterId", reason, description, "imageUrls", "occurredAt", status, "reviewedAt", "reviewedBy", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: checkout_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.checkout_sessions (id, "userId", "campaignId", "rewardId", payload, "returnPath", status, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.conversations (id, "conversationKey", type, "participantIds", participants, "campaignData", "lastMessage", "unreadCount", "isActive", "isReported", "blockedBy", "hiddenBy", "typingBy", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: daily_tip_invoices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.daily_tip_invoices (id, "invoiceDate", "totalTip", "totalVat", status, "createdAt") FROM stdin;
\.


--
-- Data for Name: donation_certificates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.donation_certificates (id, code, "pledgeId", "campaignId", "creatorId", "backerUserId", "guestEmail", "displayName", amount, "flowType", "documentKind", status, "issuedAt", "emailSentAt", "claimedAt", "claimedByUserId", "createdAt", "updatedAt") FROM stdin;
74d994e1-d6f2-45fa-a070-ec1cc0ce9d1a	TT-UH-202609-49B9	d612cef5-7337-4f96-9c6c-b50627b3c314	7d05d3ce-a49a-48c8-8294-c2d5c0fb4b00	92df92ff-0f15-469f-9f24-99b44984bd13	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	admin@gmail.com	Admin	1000000.000000000000000000000000000000	NO_GIFT	CERTIFICATE	CLAIMED	2026-09-14 04:53:10.477	\N	2026-09-16 04:24:20.717	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	2026-09-14 04:53:10.477	2026-09-16 04:24:20.717
f833659d-b6d1-460b-a76e-40cc7cb89531	TT-UH-202609-403A	f0cbf126-4cb6-48fa-b88c-72452e33b24b	7d05d3ce-a49a-48c8-8294-c2d5c0fb4b00	92df92ff-0f15-469f-9f24-99b44984bd13	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	admin@gmail.com	Admin	500000.000000000000000000000000000000	NO_GIFT	CERTIFICATE	CLAIMED	2026-09-14 05:17:04.228	\N	2026-09-16 04:24:20.717	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	2026-09-14 05:17:04.228	2026-09-16 04:24:20.717
\.


--
-- Data for Name: kyc_info; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.kyc_info (id, "userId", "fullName", "idCardNumber", "idCardType", "idCardFrontImage", "idCardBackImage", "idCardIssueDate", "idCardIssuePlace", "dateOfBirth", "placeOfBirth", nationality, "permanentAddress", "currentAddress", occupation, "monthlyIncome", "verificationStatus", "verifiedAt", "verifiedBy", "rejectedReason", "riskLevel", "createdAt", "updatedAt", "selfieImage", "consentAt", "ekycMeta") FROM stdin;
\.


--
-- Data for Name: message_reactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.message_reactions (id, "messageId", emoji, "userIds") FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.messages (id, "conversationId", "senderId", "senderName", "senderAvatar", text, type, attachments, "readBy", "isDeleted", sensitive, "revealedBy", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notifications (id, "userId", type, title, message, payload, "isRead", "readAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.password_reset_tokens (id, "userId", "tokenHash", "expiresAt", "usedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: payment_methods; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment_methods (id, "userId", provider, "methodType", label, brand, last4, "providerMethodRef", status, "isDefault", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: platform_invoices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.platform_invoices (id, "invoiceNumber", "campaignId", "creatorId", amount, "vatAmount", "totalAmount", status, "dueDate", "paidAt", "paymentMethod", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: platform_settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.platform_settings (key, value, updated_at) FROM stdin;
\.


--
-- Data for Name: pledges; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pledges (id, "campaignId", "userId", "displayName", "isAnonymous", email, "phoneNumber", amount, "tipAmount", "platformFee", "vatAmount", "totalAmount", "paymentProvider", "transactionId", "ipAddress", "deviceInfo", status, "refundStatus", "refundedAt", "invoiceGroupDate", "createdAt", "updatedAt", "rewardId", "shippingAddress", "payosOrderCode", "webhookProcessedAt", "receivedAt", "isCashOnDelivery", quantity, "stockReserved", "fulfillmentType", "fulfillmentStatus", "shippingMethod", "shippingFee", "shippingProvider", "trackingNumber", "deliveryFailureReason", "cancellationReason", "returnReason", "accountingReversedAt", "depositAmount", "chargeAmount", "orderTotalAmount", "remainingAmount", "paidAmount", "accountingAmount", "refundAmount", "cancellationFeeAmount", "handedToCarrierAt") FROM stdin;
9bc4755a-07a0-43a3-8208-5e37511faea2	5cfeef34-e2c8-4769-ba33-0c69fd903897	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	189000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	189000.000000000000000000000000000000	COD	FIXTURE-SALE-1787564112989-0-yvdzf	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:12.99	2026-08-24 09:34:56.763	6b4d4c8d-8a2e-4d9e-b9b3-78c50eaa9240	\N	\N	\N	2026-08-22 09:34:56.763	t	1	f	PHYSICAL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	94500.000000000000000000000000000000	189000.000000000000000000000000000000	189000.000000000000000000000000000000	0.000000000000000000000000000000	189000.000000000000000000000000000000	189000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
9f70b31c-b1db-4482-87b2-0b9da5091b71	4d77b180-6d10-43ff-abc7-37afb11aec67	f88cb919-d8c3-412f-8996-0f74ee3ea443	Test Backer	f	test1@gmail.com	\N	159000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	159000.000000000000000000000000000000	TEST	FIXTURE-SALE-1787564113915-1-4vqz3	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:13.916	2026-08-24 09:34:56.763	961807e0-0e8b-4301-854b-c01c34a67a14	\N	\N	\N	2026-08-21 09:34:56.763	f	1	f	PHYSICAL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	159000.000000000000000000000000000000	159000.000000000000000000000000000000	159000.000000000000000000000000000000	0.000000000000000000000000000000	159000.000000000000000000000000000000	159000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
68ee1109-42e1-43a1-99c1-0d2f017cfc8a	62c0e6a0-0765-4615-871d-f2378232e5ec	92df92ff-0f15-469f-9f24-99b44984bd13	Test Creator	f	test2@gmail.com	\N	89000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	89000.000000000000000000000000000000	TEST	FIXTURE-SALE-1787564114144-2-95gyw	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:14.145	2026-08-24 09:34:56.763	a929cdb7-d480-4ade-a475-0c76f36e0642	\N	\N	\N	2026-08-20 09:34:56.763	f	1	f	PHYSICAL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	89000.000000000000000000000000000000	89000.000000000000000000000000000000	89000.000000000000000000000000000000	0.000000000000000000000000000000	89000.000000000000000000000000000000	89000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
3e50732d-5b54-45ef-97cc-f79ef4d15096	820e8529-0d51-4631-b0d4-f5f810c85429	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	Admin  	f	admin@gmail.com	\N	349000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	349000.000000000000000000000000000000	COD	FIXTURE-SALE-1787564114824-3-dsj8l	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:14.825	2026-08-24 09:34:56.763	9cd320c0-f4a2-453b-8997-b3cb469cbadd	\N	\N	\N	2026-08-19 09:34:56.763	t	1	f	PHYSICAL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	174500.000000000000000000000000000000	349000.000000000000000000000000000000	349000.000000000000000000000000000000	0.000000000000000000000000000000	349000.000000000000000000000000000000	349000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
22aff8ba-aa2a-4567-8ba8-1352d67e304c	9d1680c1-b6b6-4817-86ce-edf7a63a8a57	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	120000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	120000.000000000000000000000000000000	TEST	FIXTURE-SALE-1787564115061-4-wlg9t	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:15.063	2026-08-24 09:34:56.763	9f025c49-0331-437c-a227-2de86a7f0824	\N	\N	\N	2026-08-18 09:34:56.763	f	1	f	EMAIL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	120000.000000000000000000000000000000	120000.000000000000000000000000000000	120000.000000000000000000000000000000	0.000000000000000000000000000000	120000.000000000000000000000000000000	120000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
b658ee25-e6e1-4c28-b3fb-33a3826eb5b5	21e72a37-afe0-4cd0-8a5a-fdeff50d033a	f88cb919-d8c3-412f-8996-0f74ee3ea443	Test Backer	f	test1@gmail.com	\N	599000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	599000.000000000000000000000000000000	TEST	FIXTURE-SALE-1787564115518-5-95143	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:15.52	2026-08-24 09:34:56.763	64a38602-3b64-4786-81a0-8d721123f8cf	\N	\N	\N	2026-08-17 09:34:56.763	f	1	f	DOWNLOAD	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	599000.000000000000000000000000000000	599000.000000000000000000000000000000	599000.000000000000000000000000000000	0.000000000000000000000000000000	599000.000000000000000000000000000000	599000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
5b48316b-5fc0-417f-90dd-0ff5e6e96490	a022b4c2-6e72-4e9c-9098-e93eedf65bed	92df92ff-0f15-469f-9f24-99b44984bd13	Test Creator	f	test2@gmail.com	\N	250000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	250000.000000000000000000000000000000	COD	FIXTURE-SALE-1787564115747-6-rfo76	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:15.748	2026-08-24 09:34:56.763	04a2bd36-1490-40e9-a1c3-defb3f48c897	\N	\N	\N	2026-08-16 09:34:56.763	t	1	f	PHYSICAL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	125000.000000000000000000000000000000	250000.000000000000000000000000000000	250000.000000000000000000000000000000	0.000000000000000000000000000000	250000.000000000000000000000000000000	250000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
baeb44e1-42b1-48d8-858e-a0bc003336ec	adbdecb6-241a-4266-a8c5-5d4e8ae60298	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	Admin  	f	admin@gmail.com	\N	79000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	79000.000000000000000000000000000000	TEST	FIXTURE-SALE-1787564116202-7-32zej	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:16.203	2026-08-24 09:34:56.763	99f68bfa-2672-4acd-bbfc-77ef362a1c50	\N	\N	\N	2026-08-15 09:34:56.763	f	1	f	PHYSICAL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	79000.000000000000000000000000000000	79000.000000000000000000000000000000	79000.000000000000000000000000000000	0.000000000000000000000000000000	79000.000000000000000000000000000000	79000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
4be10b56-0a41-4065-a566-747561520044	065955fc-3da0-4d92-aac8-b6d8d80c201d	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	129000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	129000.000000000000000000000000000000	TEST	FIXTURE-SALE-1787564116431-8-pf248	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:16.432	2026-08-24 09:34:56.763	9bafa9f9-08af-4144-9328-35012b4e6680	\N	\N	\N	2026-08-14 09:34:56.763	f	1	f	DOWNLOAD	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	129000.000000000000000000000000000000	129000.000000000000000000000000000000	129000.000000000000000000000000000000	0.000000000000000000000000000000	129000.000000000000000000000000000000	129000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
a41205b8-2dd6-4cb5-bec8-7c25ea06fb33	7d05d3ce-a49a-48c8-8294-c2d5c0fb4b00	f88cb919-d8c3-412f-8996-0f74ee3ea443	Test Backer	f	test1@gmail.com	\N	350000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	350000.000000000000000000000000000000	COD	FIXTURE-SALE-1787564116661-9-8d9ev	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:16.663	2026-08-24 09:34:56.763	eaed0da6-9510-4a54-8020-2c5c8d6a03a3	\N	\N	\N	2026-08-13 09:34:56.763	t	1	f	EMAIL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	175000.000000000000000000000000000000	350000.000000000000000000000000000000	350000.000000000000000000000000000000	0.000000000000000000000000000000	350000.000000000000000000000000000000	350000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
7a2a4ba3-3e20-4e76-96d4-848f5464d256	57bc2747-1432-4d52-b866-a9bcfdf19478	92df92ff-0f15-469f-9f24-99b44984bd13	Test Creator	f	test2@gmail.com	\N	139000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	139000.000000000000000000000000000000	TEST	FIXTURE-SALE-1787564116890-10-z686r	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:16.891	2026-08-24 09:34:56.763	190d78cf-c8f7-4e51-b776-13af81cd47b9	\N	\N	\N	2026-08-12 09:34:56.763	f	1	f	PHYSICAL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	139000.000000000000000000000000000000	139000.000000000000000000000000000000	139000.000000000000000000000000000000	0.000000000000000000000000000000	139000.000000000000000000000000000000	139000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
708273bf-3c8a-4fe1-8250-2b8d905f6678	ea5afccd-8803-453a-acca-3243d2a20ec0	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	Admin  	f	admin@gmail.com	\N	990000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	990000.000000000000000000000000000000	TEST	FIXTURE-SALE-1787564117118-11-qqj3u	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:17.119	2026-08-24 09:34:56.763	a18f4d69-3fbe-4d1d-ba54-f7358a91baaa	\N	\N	\N	2026-08-11 09:34:56.763	f	1	f	EMAIL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	990000.000000000000000000000000000000	990000.000000000000000000000000000000	990000.000000000000000000000000000000	0.000000000000000000000000000000	990000.000000000000000000000000000000	990000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
7840b8ea-924f-4802-9bd7-d99b041ac7c2	5cfeef34-e2c8-4769-ba33-0c69fd903897	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	49000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	49000.000000000000000000000000000000	COD	FIXTURE-SALE-1787564117347-12-u18ml	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:17.348	2026-08-24 09:34:56.763	7604c238-f438-47d1-8b65-58782e87613f	\N	\N	\N	2026-08-10 09:34:56.763	t	1	f	PHYSICAL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	24500.000000000000000000000000000000	49000.000000000000000000000000000000	49000.000000000000000000000000000000	0.000000000000000000000000000000	49000.000000000000000000000000000000	49000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
263937f5-a425-4002-9eb4-1fd654cdb8e3	4d77b180-6d10-43ff-abc7-37afb11aec67	f88cb919-d8c3-412f-8996-0f74ee3ea443	Test Backer	f	test1@gmail.com	\N	299000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	299000.000000000000000000000000000000	TEST	FIXTURE-SALE-1787564117575-13-78w37	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:17.576	2026-08-24 09:34:56.763	15be9ff2-bd21-4b7d-8b0e-b33e894fe205	\N	\N	\N	2026-08-09 09:34:56.763	f	1	f	LICENSE_KEY	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	299000.000000000000000000000000000000	299000.000000000000000000000000000000	299000.000000000000000000000000000000	0.000000000000000000000000000000	299000.000000000000000000000000000000	299000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
2870c36c-03a7-44a1-9407-7b6c9fddea8e	62c0e6a0-0765-4615-871d-f2378232e5ec	92df92ff-0f15-469f-9f24-99b44984bd13	Test Creator	f	test2@gmail.com	\N	69000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	69000.000000000000000000000000000000	TEST	FIXTURE-SALE-1787564117803-14-y3k5z	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:17.804	2026-08-24 09:34:56.763	dc9b1e53-ed06-40d2-86c4-16bb2e46fcb1	\N	\N	\N	2026-08-08 09:34:56.763	f	1	f	DIGITAL_COMIC	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	69000.000000000000000000000000000000	69000.000000000000000000000000000000	69000.000000000000000000000000000000	0.000000000000000000000000000000	69000.000000000000000000000000000000	69000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
74b3b35e-8436-4093-8142-f70da193ea11	820e8529-0d51-4631-b0d4-f5f810c85429	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	Admin  	f	admin@gmail.com	\N	449000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	449000.000000000000000000000000000000	COD	FIXTURE-SALE-1787564118046-15-1gcta	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-24 09:35:18.054	2026-08-24 09:34:56.763	5224012e-b4ae-48d3-95ae-aa25830e85a9	\N	\N	\N	2026-08-07 09:34:56.763	t	1	f	PHYSICAL	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	224500.000000000000000000000000000000	449000.000000000000000000000000000000	449000.000000000000000000000000000000	0.000000000000000000000000000000	449000.000000000000000000000000000000	449000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
3adef27a-4fa4-4964-8e48-a7483738216a	57bc2747-1432-4d52-b866-a9bcfdf19478	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	99000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	99000.000000000000000000000000000000	DEMO	demo-wh-cmphnhw8e0002so1uh16dwpvn-game	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-27 18:06:08.513	2026-08-27 18:06:08.512	5126c0a1-063f-4047-b44f-cd3aa156d1de	\N	\N	\N	\N	f	1	f	LICENSE_KEY	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	0.000000000000000000000000000000	99000.000000000000000000000000000000	99000.000000000000000000000000000000	0.000000000000000000000000000000	99000.000000000000000000000000000000	99000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
e80c0f27-0a42-40fa-98ab-7f503dbc490d	57bc2747-1432-4d52-b866-a9bcfdf19478	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	45000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	45000.000000000000000000000000000000	DEMO	demo-wh-cmphnhw8e0002so1uh16dwpvn-comic	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-27 18:06:08.604	2026-08-27 18:06:08.603	b5fb769c-7c41-4b0c-b847-bd63bf8b4634	\N	\N	\N	\N	f	1	f	DIGITAL_COMIC	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	0.000000000000000000000000000000	45000.000000000000000000000000000000	45000.000000000000000000000000000000	0.000000000000000000000000000000	45000.000000000000000000000000000000	45000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
8459fdd6-9373-47f4-b552-291ce2e20d98	57bc2747-1432-4d52-b866-a9bcfdf19478	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	29000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	29000.000000000000000000000000000000	DEMO	demo-wh-cmphnhw8e0002so1uh16dwpvn-image	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-27 18:06:08.617	2026-08-27 18:06:08.616	71eda5c1-d7c4-44b5-80f2-3a1f76f584be	\N	\N	\N	\N	f	1	f	DOWNLOAD	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	0.000000000000000000000000000000	29000.000000000000000000000000000000	29000.000000000000000000000000000000	0.000000000000000000000000000000	29000.000000000000000000000000000000	29000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
d1c5a7cd-42cc-436c-8d27-82d77487404a	57bc2747-1432-4d52-b866-a9bcfdf19478	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	39000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	39000.000000000000000000000000000000	DEMO	demo-wh-cmphnhw8e0002so1uh16dwpvn-video	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-27 18:06:08.629	2026-08-27 18:06:08.628	75548463-baf3-4533-9007-accd30f732c9	\N	\N	\N	\N	f	1	f	DOWNLOAD	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	0.000000000000000000000000000000	39000.000000000000000000000000000000	39000.000000000000000000000000000000	0.000000000000000000000000000000	39000.000000000000000000000000000000	39000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
4cbcdb41-4a51-4e04-8d6f-8fcd16a3a488	57bc2747-1432-4d52-b866-a9bcfdf19478	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	59000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	59000.000000000000000000000000000000	DEMO	demo-wh-cmphnhw8e0002so1uh16dwpvn-ebook	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-08-27 18:06:08.646	2026-08-27 18:06:08.645	30ebc09b-4b05-455a-811e-9be26c3d9404	\N	\N	\N	\N	f	1	f	DOWNLOAD	DELIVERED	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	0.000000000000000000000000000000	59000.000000000000000000000000000000	59000.000000000000000000000000000000	0.000000000000000000000000000000	59000.000000000000000000000000000000	59000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
d3467eda-7024-482f-adbf-188f09a88db8	065955fc-3da0-4d92-aac8-b6d8d80c201d	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	200000.000000000000000000000000000000	10000.000000000000000000000000000000	0.000000000000000000000000000000	1000.000000000000000000000000000000	211000.000000000000000000000000000000	PAYOS	ONLINE-2cd483ee-08f0-4081-9a87-07f6d0a523dd	103.199.42.168	\N	FAILED	NO_REFUND	\N	\N	2026-08-27 18:08:57.158	2026-08-27 18:08:57.184	\N	\N	\N	\N	\N	f	1	f	\N	CANCELED	STANDARD	0.000000000000000000000000000000	\N	\N	\N	Không tạo được phiên thanh toán	\N	\N	0.000000000000000000000000000000	211000.000000000000000000000000000000	211000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
c6b3a2d5-3389-4b83-999d-e5a931d9e601	065955fc-3da0-4d92-aac8-b6d8d80c201d	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	200000.000000000000000000000000000000	10000.000000000000000000000000000000	0.000000000000000000000000000000	1000.000000000000000000000000000000	211000.000000000000000000000000000000	PAYOS	ONLINE-90857156-ee05-4ab8-9224-0692d2e8e730	103.199.42.168	\N	FAILED	NO_REFUND	\N	\N	2026-08-27 18:09:00.943	2026-08-27 18:09:00.954	\N	\N	\N	\N	\N	f	1	f	\N	CANCELED	STANDARD	0.000000000000000000000000000000	\N	\N	\N	Không tạo được phiên thanh toán	\N	\N	0.000000000000000000000000000000	211000.000000000000000000000000000000	211000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
37cd1368-379f-4318-bad9-7bf3b703dcb7	065955fc-3da0-4d92-aac8-b6d8d80c201d	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	200000.000000000000000000000000000000	10000.000000000000000000000000000000	0.000000000000000000000000000000	1000.000000000000000000000000000000	211000.000000000000000000000000000000	PAYOS	ONLINE-fffa542d-e228-4f70-87c5-a3b14d49dd74	103.199.42.168	\N	FAILED	NO_REFUND	\N	\N	2026-08-27 18:09:02.226	2026-08-27 18:09:02.237	\N	\N	\N	\N	\N	f	1	f	\N	CANCELED	STANDARD	0.000000000000000000000000000000	\N	\N	\N	Không tạo được phiên thanh toán	\N	\N	0.000000000000000000000000000000	211000.000000000000000000000000000000	211000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
dea02cfc-60cc-4497-a7f7-9bf7cbd087d0	5cfeef34-e2c8-4769-ba33-0c69fd903897	\N	Khách hàng	f	\N	\N	100000.000000000000000000000000000000	5000.000000000000000000000000000000	0.000000000000000000000000000000	500.000000000000000000000000000000	105500.000000000000000000000000000000	PAYOS	ONLINE-b91c9dfa-7e07-4f5b-9d19-077ca07dfd7e	118.71.70.164	\N	FAILED	NO_REFUND	\N	\N	2026-08-28 04:14:12.029	2026-08-28 04:14:12.103	\N	\N	\N	\N	\N	f	1	f	\N	CANCELED	STANDARD	0.000000000000000000000000000000	\N	\N	\N	Không tạo được phiên thanh toán	\N	\N	0.000000000000000000000000000000	105500.000000000000000000000000000000	105500.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
8542566f-5fab-45ca-a679-ed4eb2801d76	5cfeef34-e2c8-4769-ba33-0c69fd903897	\N	Khách hàng	f	\N	\N	100000.000000000000000000000000000000	5000.000000000000000000000000000000	0.000000000000000000000000000000	500.000000000000000000000000000000	105500.000000000000000000000000000000	PAYOS	ONLINE-6387fa2a-f9c1-4ea8-8a8e-550556bfaaa3	118.71.70.164	\N	FAILED	NO_REFUND	\N	\N	2026-08-28 04:14:14.501	2026-08-28 04:14:14.515	\N	\N	\N	\N	\N	f	1	f	\N	CANCELED	STANDARD	0.000000000000000000000000000000	\N	\N	\N	Không tạo được phiên thanh toán	\N	\N	0.000000000000000000000000000000	105500.000000000000000000000000000000	105500.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
5bcfc2e6-82f5-46fd-8a6c-522cfa1c072c	5cfeef34-e2c8-4769-ba33-0c69fd903897	\N	Khách hàng	f	\N	\N	100000.000000000000000000000000000000	5000.000000000000000000000000000000	0.000000000000000000000000000000	500.000000000000000000000000000000	105500.000000000000000000000000000000	PAYOS	ONLINE-a33fcacd-9cc3-4a8a-9279-38664ef1d540	118.71.70.164	\N	FAILED	NO_REFUND	\N	\N	2026-08-28 04:14:15.196	2026-08-28 04:14:15.21	\N	\N	\N	\N	\N	f	1	f	\N	CANCELED	STANDARD	0.000000000000000000000000000000	\N	\N	\N	Không tạo được phiên thanh toán	\N	\N	0.000000000000000000000000000000	105500.000000000000000000000000000000	105500.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
5e89a4bb-223b-4a5d-b5f7-dcc04490a1e3	5cfeef34-e2c8-4769-ba33-0c69fd903897	\N	Khách hàng	f	\N	\N	100000.000000000000000000000000000000	5000.000000000000000000000000000000	0.000000000000000000000000000000	500.000000000000000000000000000000	105500.000000000000000000000000000000	PAYOS	ONLINE-2ca6bb2b-ee8a-448a-b15a-0a58d254f01c	118.71.70.164	\N	FAILED	NO_REFUND	\N	\N	2026-08-28 04:14:15.852	2026-08-28 04:14:15.869	\N	\N	\N	\N	\N	f	1	f	\N	CANCELED	STANDARD	0.000000000000000000000000000000	\N	\N	\N	Không tạo được phiên thanh toán	\N	\N	0.000000000000000000000000000000	105500.000000000000000000000000000000	105500.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
e7f9cd24-3d2d-4ff8-a041-b1199a9690f5	5cfeef34-e2c8-4769-ba33-0c69fd903897	\N	Khách hàng	f	\N	\N	100000.000000000000000000000000000000	5000.000000000000000000000000000000	0.000000000000000000000000000000	500.000000000000000000000000000000	105500.000000000000000000000000000000	PAYOS	ONLINE-84a0044b-ceba-42c2-8e73-a8325fcb4189	118.71.70.164	\N	FAILED	NO_REFUND	\N	\N	2026-08-28 04:14:16.486	2026-08-28 04:14:16.502	\N	\N	\N	\N	\N	f	1	f	\N	CANCELED	STANDARD	0.000000000000000000000000000000	\N	\N	\N	Không tạo được phiên thanh toán	\N	\N	0.000000000000000000000000000000	105500.000000000000000000000000000000	105500.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
a5a904bb-0752-4fec-9a20-442158069816	5cfeef34-e2c8-4769-ba33-0c69fd903897	\N	Khách hàng	f	\N	\N	100000.000000000000000000000000000000	5000.000000000000000000000000000000	0.000000000000000000000000000000	500.000000000000000000000000000000	105500.000000000000000000000000000000	PAYOS	ONLINE-31bbb420-2a2f-4f06-9f60-8e96e1a59fd0	118.71.70.164	\N	FAILED	NO_REFUND	\N	\N	2026-08-28 04:14:16.914	2026-08-28 04:14:16.929	\N	\N	\N	\N	\N	f	1	f	\N	CANCELED	STANDARD	0.000000000000000000000000000000	\N	\N	\N	Không tạo được phiên thanh toán	\N	\N	0.000000000000000000000000000000	105500.000000000000000000000000000000	105500.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
b41299f0-7a5d-4886-90e7-97c15e6c7ce1	065955fc-3da0-4d92-aac8-b6d8d80c201d	cmphnhw8e0002so1uh16dwpvn	Test Creator Pro	f	test3@gmail.com	\N	129000.000000000000000000000000000000	0.000000000000000000000000000000	10320.000000000000000000000000000000	0.000000000000000000000000000000	129000.000000000000000000000000000000	BANK_ESCROW	ESCROW-aca0fddd-277e-4342-a1ee-7f47642ce430	118.71.70.164	\N	FAILED	NO_REFUND	\N	\N	2026-09-11 03:31:55.23	2026-09-14 03:25:02.428	9bafa9f9-08af-4144-9328-35012b4e6680	\N	TUTEB41299F07A	\N	\N	f	1	f	DOWNLOAD	CANCELED	EMAIL	0.000000000000000000000000000000	\N	\N	\N	Phien chuyen khoan da het han (chua doi soat)	\N	\N	0.000000000000000000000000000000	129000.000000000000000000000000000000	129000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
d612cef5-7337-4f96-9c6c-b50627b3c314	7d05d3ce-a49a-48c8-8294-c2d5c0fb4b00	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	Admin	f	admin@gmail.com	\N	1000000.000000000000000000000000000000	0.000000000000000000000000000000	80000.000000000000000000000000000000	0.000000000000000000000000000000	1000000.000000000000000000000000000000	BANK_ESCROW	MANUAL-UH-1789361590477-ca70a0	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-09-14 04:53:10.477	2026-09-14 04:53:10.477	\N	\N	\N	\N	\N	f	1	f	\N	NOT_APPLICABLE	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	0.000000000000000000000000000000	1000000.000000000000000000000000000000	1000000.000000000000000000000000000000	0.000000000000000000000000000000	1000000.000000000000000000000000000000	1000000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
f0cbf126-4cb6-48fa-b88c-72452e33b24b	7d05d3ce-a49a-48c8-8294-c2d5c0fb4b00	d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	Admin	f	admin@gmail.com	\N	500000.000000000000000000000000000000	0.000000000000000000000000000000	40000.000000000000000000000000000000	0.000000000000000000000000000000	500000.000000000000000000000000000000	BANK_ESCROW	MANUAL-UH-1789363024229-849cc3	\N	\N	SUCCESS	NO_REFUND	\N	\N	2026-09-14 05:17:04.228	2026-09-14 05:17:04.228	\N	\N	\N	\N	\N	f	1	f	\N	NOT_APPLICABLE	\N	0.000000000000000000000000000000	\N	\N	\N	\N	\N	\N	0.000000000000000000000000000000	500000.000000000000000000000000000000	500000.000000000000000000000000000000	0.000000000000000000000000000000	500000.000000000000000000000000000000	500000.000000000000000000000000000000	0.000000000000000000000000000000	0.000000000000000000000000000000	\N
\.


--
-- Data for Name: product_reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_reviews (id, "rewardId", "pledgeId", "userId", rating, comment, "mediaUrls", "createdAt", "updatedAt") FROM stdin;
19b69b01-a54b-46fb-b636-2deeebc03a5c	6b4d4c8d-8a2e-4d9e-b9b3-78c50eaa9240	9bc4755a-07a0-43a3-8208-5e37511faea2	cmphnhw8e0002so1uh16dwpvn	3	Đánh giá fixture 1: sản phẩm đúng mô tả và dễ sử dụng.	{}	2026-08-24 09:35:13.458	2026-08-24 09:34:56.763
5f141e47-6f6c-4288-b407-f4983e1677a1	a929cdb7-d480-4ade-a475-0c76f36e0642	68ee1109-42e1-43a1-99c1-0d2f017cfc8a	92df92ff-0f15-469f-9f24-99b44984bd13	5	Đánh giá fixture 3: sản phẩm đúng mô tả và dễ sử dụng.	{}	2026-08-24 09:35:14.373	2026-08-24 09:34:56.763
885293dc-6635-4665-a856-3f41bb74dc81	9f025c49-0331-437c-a227-2de86a7f0824	22aff8ba-aa2a-4567-8ba8-1352d67e304c	cmphnhw8e0002so1uh16dwpvn	4	Đánh giá fixture 5: sản phẩm đúng mô tả và dễ sử dụng.	{}	2026-08-24 09:35:15.292	2026-08-24 09:34:56.763
2d5c35fc-fe28-4625-a32e-0b03d7d392c7	04a2bd36-1490-40e9-a1c3-defb3f48c897	5b48316b-5fc0-417f-90dd-0ff5e6e96490	92df92ff-0f15-469f-9f24-99b44984bd13	3	Đánh giá fixture 7: sản phẩm đúng mô tả và dễ sử dụng.	{}	2026-08-24 09:35:15.976	2026-08-24 09:34:56.763
\.


--
-- Data for Name: profile_customization_versions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.profile_customization_versions (id, "customizationId", version, action, config, "createdAt") FROM stdin;
\.


--
-- Data for Name: profile_customizations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.profile_customizations (id, "userId", "draftConfig", "publishedConfig", "draftVersion", "publishedVersion", "publishedAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: project_blog_links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_blog_links (id, "projectId", "blogPostId", "order", "createdAt") FROM stdin;
\.


--
-- Data for Name: project_reward_links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_reward_links (id, "projectId", "rewardId", "order", "createdAt") FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projects (id, "creatorId", title, slug, description, "coverImage", "richDescription", "heroBackgroundType", "heroBackgroundConfig", "createdAt", "updatedAt", "isLocked") FROM stdin;
cmt0y1lls000196jc66m2pj7t	cmphnhw8e0002so1uh16dwpvn	Mầm xanh tử tế	mam-xanh-tu-te	Dự án trồng cây xanh cho trường học vùng khó khăn. Mỗi đóng góp sẽ giúp các em nhỏ có không gian học tập xanh mát và trong lành.	\N	{"type": "doc", "content": [{"type": "paragraph", "content": [{"text": "Dự án trồng cây xanh cho trường học vùng khó khăn.", "type": "text"}]}]}	image	\N	2026-08-20 03:11:19.455	2026-08-20 03:11:19.456	f
cmt71ii4d0001y4v2wo8sxbf9	cmphnhw8e0002so1uh16dwpvn	[FIXTURE-2026] Vườn học xanh cho trẻ em vùng cao	vuon-hoc-xanh-cho-tre-em-vung-cao-1787564103996-f12qe	Môi trường học tập xanh, an toàn và giàu cảm hứng cho học sinh vùng cao.	https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=82	{"fixture": true, "sections": ["Tầm nhìn", "Tác động", "Lộ trình"]}	image	{"angle": 135, "colors": ["#166534", "#86efac"]}	2026-08-24 09:35:03.997	2026-08-24 09:35:03.997	f
cmt71iih30003y4v2q7dc76vx	92df92ff-0f15-469f-9f24-99b44984bd13	[FIXTURE-2026] Xưởng truyện tranh Việt	xuong-truyen-tranh-viet-1787564104455-ciims	Phát triển IP truyện tranh Việt Nam với đội ngũ họa sĩ trẻ.	https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=82	{"fixture": true, "sections": ["Tầm nhìn", "Tác động", "Lộ trình"]}	color	{"angle": 135, "colors": ["#7c2d12", "#fdba74"]}	2026-08-24 09:35:04.456	2026-08-24 09:35:04.456	f
cmt71iinf0005y4v2ybu264dk	cmphnhw8e0002so1uh16dwpvn	[FIXTURE-2026] Lớp học kỹ năng số cộng đồng	lop-hoc-ky-nang-so-cong-dong-1787564104682-otpig	Đưa kỹ năng số và công cụ AI thiết thực đến các thư viện địa phương.	https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82	{"fixture": true, "sections": ["Tầm nhìn", "Tác động", "Lộ trình"]}	image	{"angle": 135, "colors": ["#1e3a8a", "#93c5fd"]}	2026-08-24 09:35:04.683	2026-08-24 09:35:04.683	f
cmt71iitr0007y4v2ogyi0ib3	92df92ff-0f15-469f-9f24-99b44984bd13	[FIXTURE-2026] Bếp ăn tử tế mỗi ngày	bep-an-tu-te-moi-ngay-1787564104910-24a0a	Kết nối nguồn lực để duy trì những bữa ăn dinh dưỡng cho người lao động khó khăn.	https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=82	{"fixture": true, "sections": ["Tầm nhìn", "Tác động", "Lộ trình"]}	color	{"angle": 135, "colors": ["#9a3412", "#fed7aa"]}	2026-08-24 09:35:04.911	2026-08-24 09:35:04.911	f
cmt71ij030009y4v24x3m6vo0	cmphnhw8e0002so1uh16dwpvn	[FIXTURE-2026] Âm nhạc chữa lành	am-nhac-chua-lanh-1787564105138-r74ti	Một không gian âm nhạc độc lập cho nghệ sĩ và cộng đồng.	https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=82	{"fixture": true, "sections": ["Tầm nhìn", "Tác động", "Lộ trình"]}	image	{"angle": 135, "colors": ["#581c87", "#d8b4fe"]}	2026-08-24 09:35:05.139	2026-08-24 09:35:05.139	f
cmt71ij6i000by4v24132igx3	92df92ff-0f15-469f-9f24-99b44984bd13	[FIXTURE-2026] Nông trại tuần hoàn	nong-trai-tuan-hoan-1787564105369-39zcm	Thử nghiệm mô hình nông nghiệp nhỏ, tiết kiệm nước và không rác thải.	https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=82	{"fixture": true, "sections": ["Tầm nhìn", "Tác động", "Lộ trình"]}	color	{"angle": 135, "colors": ["#115e59", "#99f6e4"]}	2026-08-24 09:35:05.37	2026-08-24 09:35:05.37	f
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reviews (id, "userId", "campaignId", rating, comment, "imageUrl", "createdAt") FROM stdin;
\.


--
-- Data for Name: reward_digital_assets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reward_digital_assets (id, "rewardId", "campaignId", "pledgeId", "assetType", "encryptedValue", "assetUrl", "deliveryEmail", status, "deliveredAt", "claimedAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: rewards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rewards (id, "campaignId", "projectId", title, description, "createdAt", "deliveryDate", "isActive", "isIncludedInProject", "maxQuantity", "minAmount", "maxAmount", stock, "productImages", "productVideo", "updatedAt", availability, "fulfillmentType", "isPreorder", "onlineDepositPercent", "codDepositPercent") FROM stdin;
026a4a4b-8d59-4168-ae0d-7d180d9858e4	71d24f68-f9aa-4a6f-b42a-409b1ab4cb43	\N	Bảng tri ân xanh	Tên bạn được khắc trên bảng tri ân đặt tại trường được chọn. Đính kèm 1 hạt giống cây xanh gửi tận nhà.	2026-08-20 08:08:56.558	2026-11-18 08:08:56.557	t	t	\N	100000.000000000000000000000000000000	120000.000000000000000000000000000000	200	{}	\N	2026-08-20 08:08:56.557	AVAILABLE	PHYSICAL	f	30	50
b30ad967-c249-40ff-b6e4-f0b878d56e3b	\N	cmt0y1lls000196jc66m2pj7t	Bộ hạt giống cây xanh tử tế	Bộ hạt giống gồm 5 loại cây: hoa mười giờ, hoa chiều tím, rau mầm, bạc hà và hương thảo. Kèm đất dinh dưỡng, chậu giấy phân hủy sinh học và hướng dẫn trồng chi tiết. Đóng góp mỗi bộ sẽ ủng hộ quỹ trồng cây xanh cho trường học vùng khó khăn. Sản phẩm chính thức của dự án Mầm xanh tử tế.	2026-08-20 03:11:19.91	2026-09-30 00:00:00	t	t	100	55000.000000000000000000000000000000	65000.000000000000000000000000000000	100	{}	\N	2026-08-20 03:11:19.909	AVAILABLE	PHYSICAL	f	30	50
6b4d4c8d-8a2e-4d9e-b9b3-78c50eaa9240	5cfeef34-e2c8-4769-ba33-0c69fd903897	cmt71ii4d0001y4v2wo8sxbf9	[FIXTURE-2026] Áo thun Vườn học xanh	Sản phẩm fixture Áo thun Vườn học xanh, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:08.639	2026-09-18 09:34:56.763	t	t	66	189000.000000000000000000000000000000	249000.000000000000000000000000000000	46	{https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=82}	https://www.youtube.com/watch?v=dQw4w9WgXcQ	2026-08-24 09:34:56.763	AVAILABLE	PHYSICAL	t	30	50
961807e0-0e8b-4301-854b-c01c34a67a14	4d77b180-6d10-43ff-abc7-37afb11aec67	cmt71iih30003y4v2q7dc76vx	[FIXTURE-2026] Bình nước inox gây quỹ	Sản phẩm fixture Bình nước inox gây quỹ, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:09.096	\N	t	t	20	159000.000000000000000000000000000000	\N	0	{https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	PHYSICAL	f	30	50
a929cdb7-d480-4ade-a475-0c76f36e0642	62c0e6a0-0765-4615-871d-f2378232e5ec	cmt71iinf0005y4v2ybu264dk	[FIXTURE-2026] Poster Người giữ lửa A3	Sản phẩm fixture Poster Người giữ lửa A3, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:09.325	\N	t	t	38	89000.000000000000000000000000000000	119000.000000000000000000000000000000	18	{https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	PHYSICAL	f	30	50
9cd320c0-f4a2-453b-8997-b3cb469cbadd	820e8529-0d51-4631-b0d4-f5f810c85429	cmt71iitr0007y4v2ogyi0ib3	[FIXTURE-2026] Artbook Người giữ lửa - bản giới hạn	Sản phẩm fixture Artbook Người giữ lửa - bản giới hạn, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:09.552	2026-09-30 09:34:56.763	t	f	32	349000.000000000000000000000000000000	399000.000000000000000000000000000000	12	{https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	PHYSICAL	t	25	45
9f025c49-0331-437c-a227-2de86a7f0824	9d1680c1-b6b6-4817-86ce-edf7a63a8a57	cmt71ij030009y4v24x3m6vo0	[FIXTURE-2026] Vé workshop kỹ năng số	Sản phẩm fixture Vé workshop kỹ năng số, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:09.78	\N	t	t	100	120000.000000000000000000000000000000	\N	80	{https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	EMAIL	f	30	50
64a38602-3b64-4786-81a0-8d721123f8cf	21e72a37-afe0-4cd0-8a5a-fdeff50d033a	cmt71ij6i000by4v24132igx3	[FIXTURE-2026] Khóa học AI cho người mới	Sản phẩm fixture Khóa học AI cho người mới, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:10.008	2026-10-08 09:34:56.763	t	t	20	599000.000000000000000000000000000000	799000.000000000000000000000000000000	0	{https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=82}	https://www.youtube.com/watch?v=dQw4w9WgXcQ	2026-08-24 09:34:56.763	DEVELOPMENT	DOWNLOAD	t	35	55
04a2bd36-1490-40e9-a1c3-defb3f48c897	a022b4c2-6e72-4e9c-9098-e93eedf65bed	cmt71ii4d0001y4v2wo8sxbf9	[FIXTURE-2026] Combo 10 suất ăn sáng	Sản phẩm fixture Combo 10 suất ăn sáng, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:10.236	\N	t	t	55	250000.000000000000000000000000000000	\N	35	{https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	PHYSICAL	f	30	50
99f68bfa-2672-4acd-bbfc-77ef362a1c50	adbdecb6-241a-4266-a8c5-5d4e8ae60298	cmt71iih30003y4v2q7dc76vx	[FIXTURE-2026] Sổ tay Bếp tử tế	Sản phẩm fixture Sổ tay Bếp tử tế, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:10.465	\N	t	f	120	79000.000000000000000000000000000000	99000.000000000000000000000000000000	100	{https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	PHYSICAL	f	30	50
9bafa9f9-08af-4144-9328-35012b4e6680	065955fc-3da0-4d92-aac8-b6d8d80c201d	cmt71iinf0005y4v2ybu264dk	[FIXTURE-2026] Album Mầm sáng - digital	Sản phẩm fixture Album Mầm sáng - digital, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:10.708	\N	t	t	\N	129000.000000000000000000000000000000	159000.000000000000000000000000000000	\N	{https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	DOWNLOAD	f	30	50
eaed0da6-9510-4a54-8020-2c5c8d6a03a3	7d05d3ce-a49a-48c8-8294-c2d5c0fb4b00	cmt71iitr0007y4v2ogyi0ib3	[FIXTURE-2026] Vé đêm nhạc Mầm sáng	Sản phẩm fixture Vé đêm nhạc Mầm sáng, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:10.939	2026-10-24 09:34:56.763	t	t	20	350000.000000000000000000000000000000	\N	0	{https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	EMAIL	t	20	40
190d78cf-c8f7-4e51-b776-13af81cd47b9	57bc2747-1432-4d52-b866-a9bcfdf19478	cmt71ij030009y4v24x3m6vo0	[FIXTURE-2026] Bộ hạt giống vườn ban công	Sản phẩm fixture Bộ hạt giống vườn ban công, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:11.171	\N	t	t	47	139000.000000000000000000000000000000	179000.000000000000000000000000000000	27	{https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=82}	https://www.youtube.com/watch?v=dQw4w9WgXcQ	2026-08-24 09:34:56.763	AVAILABLE	PHYSICAL	f	30	50
a18f4d69-3fbe-4d1d-ba54-f7358a91baaa	ea5afccd-8803-453a-acca-3243d2a20ec0	cmt71ij6i000by4v24132igx3	[FIXTURE-2026] Tư vấn thiết kế vườn 1:1	Sản phẩm fixture Tư vấn thiết kế vườn 1:1, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:11.398	\N	t	f	25	990000.000000000000000000000000000000	\N	5	{https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	DEVELOPMENT	EMAIL	f	30	50
7604c238-f438-47d1-8b65-58782e87613f	5cfeef34-e2c8-4769-ba33-0c69fd903897	cmt71ii4d0001y4v2wo8sxbf9	[FIXTURE-2026] Bộ sticker Xưởng truyện tranh	Sản phẩm fixture Bộ sticker Xưởng truyện tranh, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:11.626	\N	t	t	270	49000.000000000000000000000000000000	\N	250	{https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	PHYSICAL	f	30	50
15be9ff2-bd21-4b7d-8b0e-b33e894fe205	4d77b180-6d10-43ff-abc7-37afb11aec67	cmt71iih30003y4v2q7dc76vx	[FIXTURE-2026] License font chữ Việt	Sản phẩm fixture License font chữ Việt, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:11.854	\N	t	t	\N	299000.000000000000000000000000000000	399000.000000000000000000000000000000	\N	{https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	LICENSE_KEY	f	40	60
dc9b1e53-ed06-40d2-86c4-16bb2e46fcb1	62c0e6a0-0765-4615-871d-f2378232e5ec	cmt71iinf0005y4v2ybu264dk	[FIXTURE-2026] Truyện tranh PDF tập 1	Sản phẩm fixture Truyện tranh PDF tập 1, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:12.082	\N	t	t	\N	69000.000000000000000000000000000000	\N	\N	{https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82}	\N	2026-08-24 09:34:56.763	AVAILABLE	DIGITAL_COMIC	f	30	50
5126c0a1-063f-4047-b44f-cd3aa156d1de	57bc2747-1432-4d52-b866-a9bcfdf19478	\N	Pixel Grove — Game offline	Demo game digital cho kho đồ.	2026-08-27 18:06:08.502	\N	t	t	\N	99000.000000000000000000000000000000	\N	\N	{https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80}	\N	2026-08-27 18:06:08.501	AVAILABLE	LICENSE_KEY	f	30	50
b5fb769c-7c41-4b0c-b847-bd63bf8b4634	57bc2747-1432-4d52-b866-a9bcfdf19478	\N	Truyện tranh Tử Tế — Tập 1	Bộ truyện tranh số đọc ngay trong kho đồ.	2026-08-27 18:06:08.6	\N	t	t	\N	45000.000000000000000000000000000000	\N	\N	{https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=400&q=80}	\N	2026-08-27 18:06:08.6	AVAILABLE	DIGITAL_COMIC	f	30	50
71eda5c1-d7c4-44b5-80f2-3a1f76f584be	57bc2747-1432-4d52-b866-a9bcfdf19478	\N	Pack ảnh minh họa 20 tấm	Tải pack ảnh digital.	2026-08-27 18:06:08.614	\N	t	t	\N	29000.000000000000000000000000000000	\N	\N	{https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=80}	\N	2026-08-27 18:06:08.613	AVAILABLE	DOWNLOAD	f	30	50
75548463-baf3-4533-9007-accd30f732c9	57bc2747-1432-4d52-b866-a9bcfdf19478	\N	Video hậu trường dự án	Clip digital xem online.	2026-08-27 18:06:08.626	\N	t	t	\N	39000.000000000000000000000000000000	\N	\N	{https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=400&q=80}	\N	2026-08-27 18:06:08.625	AVAILABLE	DOWNLOAD	f	30	50
30ebc09b-4b05-455a-811e-9be26c3d9404	57bc2747-1432-4d52-b866-a9bcfdf19478	\N	Ebook hướng dẫn góp vốn	Sách điện tử PDF.	2026-08-27 18:06:08.642	\N	t	t	\N	59000.000000000000000000000000000000	\N	\N	{https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80}	\N	2026-08-27 18:06:08.64	AVAILABLE	DOWNLOAD	f	30	50
5224012e-b4ae-48d3-95ae-aa25830e85a9	820e8529-0d51-4631-b0d4-f5f810c85429	cmt71iitr0007y4v2ogyi0ib3	[FIXTURE-2026] Hộp quà cuối mùa	Sản phẩm fixture Hộp quà cuối mùa, dùng để kiểm thử giỏ hàng, checkout, COD và giao hàng.	2026-08-24 09:35:12.31	2026-11-17 09:34:56.763	t	f	28	449000.000000000000000000000000000000	549000.000000000000000000000000000000	8	{https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=82}	https://www.youtube.com/watch?v=dQw4w9WgXcQ	2026-09-08 04:25:43.643	AVAILABLE	PHYSICAL	t	30	50
\.


--
-- Data for Name: so_ledgers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.so_ledgers (id, rev, state, "updatedAt") FROM stdin;
\.


--
-- Data for Name: transaction_limits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.transaction_limits (id, "userId", "kycStatus", "maxPerTransaction", "maxPerDay", "maxPerMonth", "maxTransactionsPerDay", "isActive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: user_badges; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_badges (id, user_id, badge_id, assigned_by, reason, note, assigned_at, expires_at, revoked_at, revoked_by, revoke_reason, is_visible) FROM stdin;
\.


--
-- Data for Name: user_metadata; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_metadata (id, "userId", preferences, onboarding, stats, tags, "customData", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: user_notes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_notes (id, "userId", "targetUserId", note, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, password, name, "displayName", avatar, phone, role, "isOrganization", "isAdmin", bio, "idCard", "businessLicense", "bankAccount", "bankName", "approvedAt", "createdAt", "updatedAt", image, location, website, "coverImage", "shippingAddress", "socialLinks", status, "privacySettings", "notificationSettings") FROM stdin;
f88cb919-d8c3-412f-8996-0f74ee3ea443	test1@gmail.com	$2b$10$JcuyAXZ1eF57XqYjoxzJ5eyOIeTBJvk6grtqrrWcVw9cNN5r9Ezlu	Test Backer	\N	\N	\N	BACKER	f	f	Người ủng hộ cộng đồng, thích góp phần vào các dự án tử tế.	\N	\N	\N	\N	\N	2026-08-20 04:34:47.512	2026-08-20 04:34:47.512	\N	\N	\N	\N	\N	\N	NORMAL	\N	\N
92df92ff-0f15-469f-9f24-99b44984bd13	test2@gmail.com	$2b$10$2vPlURU9EWwyknyHWePcQO/Bpp1a.HLwPmZdcoRKBb5JoEtKRG/Fy	Test Creator	\N	\N	\N	CREATOR	f	f	Nhà sáng tạo nội dung và dự án gây quỹ.	\N	\N	\N	\N	\N	2026-08-20 04:34:48.268	2026-08-20 04:34:48.268	\N	\N	\N	\N	\N	\N	NORMAL	\N	\N
d30b9e9b-d9a9-4d91-b43e-fdee5abfd060	admin@gmail.com	$2b$10$MyfIhH13lZkgSmsNg3NJiuXL4u8GPxWrZs5sv6T0kUK5doW7I/hDu	Admin  	\N	\N	\N	ADMIN	f	t	Quản trị viên nền tảng Tử Tử Fund.	\N	\N	\N	\N	\N	2026-08-20 04:34:48.8	2026-08-20 04:34:48.8	\N	\N	\N	\N	\N	{}	NORMAL	{"bio": true, "email": true, "phone": true, "website": true, "location": true, "socialLinks": true}	{"system": true, "comments": true, "blogReview": true, "campaignReview": true, "paymentSuccess": true, "pledgeReceived": true, "campaignFollowed": true}
cmphnhw8e0002so1uh16dwpvn	test3@gmail.com	$2b$10$2vPlURU9EWwyknyHWePcQO/Bpp1a.HLwPmZdcoRKBb5JoEtKRG/Fy	Test Creator Pro	\N	\N	\N	CREATOR	f	f	Nhà sáng tạo nội dung, người sáng lập dự án gây quỹ cộng đồng.	\N	\N	\N	\N	\N	2026-08-20 03:11:18.544	2026-08-20 03:11:18.544	\N	\N	\N	\N	\N	\N	NORMAL	\N	\N
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: activity_logs_v2 activity_logs_v2_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity_logs_v2
    ADD CONSTRAINT activity_logs_v2_pkey PRIMARY KEY (id);


--
-- Name: analytics_events analytics_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT analytics_events_pkey PRIMARY KEY (id);


--
-- Name: analytics_settings analytics_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.analytics_settings
    ADD CONSTRAINT analytics_settings_pkey PRIMARY KEY (id);


--
-- Name: assistant_telemetry_events assistant_telemetry_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assistant_telemetry_events
    ADD CONSTRAINT assistant_telemetry_events_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: backer_invoices backer_invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.backer_invoices
    ADD CONSTRAINT backer_invoices_pkey PRIMARY KEY (id);


--
-- Name: badges badges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_pkey PRIMARY KEY (id);


--
-- Name: blacklist blacklist_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blacklist
    ADD CONSTRAINT blacklist_pkey PRIMARY KEY (id);


--
-- Name: blog_bookmarks blog_bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_bookmarks
    ADD CONSTRAINT blog_bookmarks_pkey PRIMARY KEY (id);


--
-- Name: blog_categories blog_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_categories
    ADD CONSTRAINT blog_categories_pkey PRIMARY KEY (id);


--
-- Name: blog_comments blog_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT blog_comments_pkey PRIMARY KEY (id);


--
-- Name: blog_drafts blog_drafts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_drafts
    ADD CONSTRAINT blog_drafts_pkey PRIMARY KEY (id);


--
-- Name: blog_likes blog_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_likes
    ADD CONSTRAINT blog_likes_pkey PRIMARY KEY (id);


--
-- Name: blog_post_categories blog_post_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_categories
    ADD CONSTRAINT blog_post_categories_pkey PRIMARY KEY ("postId", "categoryId");


--
-- Name: blog_post_tags blog_post_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_tags
    ADD CONSTRAINT blog_post_tags_pkey PRIMARY KEY ("postId", "tagId");


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_reports blog_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_reports
    ADD CONSTRAINT blog_reports_pkey PRIMARY KEY (id);


--
-- Name: blog_tags blog_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_tags
    ADD CONSTRAINT blog_tags_pkey PRIMARY KEY (id);


--
-- Name: blog_versions blog_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_versions
    ADD CONSTRAINT blog_versions_pkey PRIMARY KEY (id);


--
-- Name: blog_view_logs blog_view_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_view_logs
    ADD CONSTRAINT blog_view_logs_pkey PRIMARY KEY (id);


--
-- Name: campaign_blog_links campaign_blog_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_blog_links
    ADD CONSTRAINT campaign_blog_links_pkey PRIMARY KEY (id);


--
-- Name: campaign_comment_reactions campaign_comment_reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_comment_reactions
    ADD CONSTRAINT campaign_comment_reactions_pkey PRIMARY KEY (id);


--
-- Name: campaign_comments campaign_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_comments
    ADD CONSTRAINT campaign_comments_pkey PRIMARY KEY (id);


--
-- Name: campaign_contents campaign_contents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_contents
    ADD CONSTRAINT campaign_contents_pkey PRIMARY KEY (id);


--
-- Name: campaign_followers campaign_followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_followers
    ADD CONSTRAINT campaign_followers_pkey PRIMARY KEY (id);


--
-- Name: campaign_reports campaign_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_reports
    ADD CONSTRAINT campaign_reports_pkey PRIMARY KEY (id);


--
-- Name: campaign_updates campaign_updates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_updates
    ADD CONSTRAINT campaign_updates_pkey PRIMARY KEY (id);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: chat_reports chat_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chat_reports
    ADD CONSTRAINT chat_reports_pkey PRIMARY KEY (id);


--
-- Name: checkout_sessions checkout_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checkout_sessions
    ADD CONSTRAINT checkout_sessions_pkey PRIMARY KEY (id);


--
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- Name: daily_tip_invoices daily_tip_invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.daily_tip_invoices
    ADD CONSTRAINT daily_tip_invoices_pkey PRIMARY KEY (id);


--
-- Name: donation_certificates donation_certificates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donation_certificates
    ADD CONSTRAINT donation_certificates_pkey PRIMARY KEY (id);


--
-- Name: kyc_info kyc_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kyc_info
    ADD CONSTRAINT kyc_info_pkey PRIMARY KEY (id);


--
-- Name: message_reactions message_reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message_reactions
    ADD CONSTRAINT message_reactions_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (id);


--
-- Name: payment_methods payment_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_methods
    ADD CONSTRAINT payment_methods_pkey PRIMARY KEY (id);


--
-- Name: platform_invoices platform_invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform_invoices
    ADD CONSTRAINT platform_invoices_pkey PRIMARY KEY (id);


--
-- Name: platform_settings platform_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform_settings
    ADD CONSTRAINT platform_settings_pkey PRIMARY KEY (key);


--
-- Name: pledges pledges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pledges
    ADD CONSTRAINT pledges_pkey PRIMARY KEY (id);


--
-- Name: product_reviews product_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_reviews
    ADD CONSTRAINT product_reviews_pkey PRIMARY KEY (id);


--
-- Name: profile_customization_versions profile_customization_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile_customization_versions
    ADD CONSTRAINT profile_customization_versions_pkey PRIMARY KEY (id);


--
-- Name: profile_customizations profile_customizations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile_customizations
    ADD CONSTRAINT profile_customizations_pkey PRIMARY KEY (id);


--
-- Name: project_blog_links project_blog_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_blog_links
    ADD CONSTRAINT project_blog_links_pkey PRIMARY KEY (id);


--
-- Name: project_reward_links project_reward_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_reward_links
    ADD CONSTRAINT project_reward_links_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: reward_digital_assets reward_digital_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reward_digital_assets
    ADD CONSTRAINT reward_digital_assets_pkey PRIMARY KEY (id);


--
-- Name: rewards rewards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_pkey PRIMARY KEY (id);


--
-- Name: so_ledgers so_ledgers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.so_ledgers
    ADD CONSTRAINT so_ledgers_pkey PRIMARY KEY (id);


--
-- Name: transaction_limits transaction_limits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_limits
    ADD CONSTRAINT transaction_limits_pkey PRIMARY KEY (id);


--
-- Name: user_badges user_badges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_pkey PRIMARY KEY (id);


--
-- Name: user_metadata user_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_metadata
    ADD CONSTRAINT user_metadata_pkey PRIMARY KEY (id);


--
-- Name: user_notes user_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_notes
    ADD CONSTRAINT user_notes_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: _blog_postsTorewards_AB_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "_blog_postsTorewards_AB_unique" ON public."_blog_postsTorewards" USING btree ("A", "B");


--
-- Name: _blog_postsTorewards_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_blog_postsTorewards_B_index" ON public."_blog_postsTorewards" USING btree ("B");


--
-- Name: activity_logs_v2_action_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX activity_logs_v2_action_idx ON public.activity_logs_v2 USING btree (action);


--
-- Name: activity_logs_v2_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "activity_logs_v2_createdAt_idx" ON public.activity_logs_v2 USING btree ("createdAt" DESC);


--
-- Name: activity_logs_v2_entityType_entityId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "activity_logs_v2_entityType_entityId_idx" ON public.activity_logs_v2 USING btree ("entityType", "entityId");


--
-- Name: activity_logs_v2_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "activity_logs_v2_userId_idx" ON public.activity_logs_v2 USING btree ("userId");


--
-- Name: analytics_events_campaignId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "analytics_events_campaignId_idx" ON public.analytics_events USING btree ("campaignId");


--
-- Name: analytics_events_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "analytics_events_createdAt_idx" ON public.analytics_events USING btree ("createdAt" DESC);


--
-- Name: analytics_events_eventName_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "analytics_events_eventName_idx" ON public.analytics_events USING btree ("eventName");


--
-- Name: analytics_events_path_eventName_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "analytics_events_path_eventName_idx" ON public.analytics_events USING btree (path, "eventName");


--
-- Name: analytics_events_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "analytics_events_userId_idx" ON public.analytics_events USING btree ("userId");


--
-- Name: assistant_telemetry_events_assistant_eventType_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "assistant_telemetry_events_assistant_eventType_createdAt_idx" ON public.assistant_telemetry_events USING btree (assistant, "eventType", "createdAt");


--
-- Name: assistant_telemetry_events_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "assistant_telemetry_events_createdAt_idx" ON public.assistant_telemetry_events USING btree ("createdAt");


--
-- Name: audit_logs_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "audit_logs_createdAt_idx" ON public.audit_logs USING btree ("createdAt");


--
-- Name: audit_logs_entityType_entityId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "audit_logs_entityType_entityId_idx" ON public.audit_logs USING btree ("entityType", "entityId");


--
-- Name: audit_logs_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "audit_logs_userId_idx" ON public.audit_logs USING btree ("userId");


--
-- Name: backer_invoices_invoiceNumber_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "backer_invoices_invoiceNumber_key" ON public.backer_invoices USING btree ("invoiceNumber");


--
-- Name: backer_invoices_pledgeId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "backer_invoices_pledgeId_key" ON public.backer_invoices USING btree ("pledgeId");


--
-- Name: badges_deleted_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX badges_deleted_at_idx ON public.badges USING btree (deleted_at);


--
-- Name: badges_is_active_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX badges_is_active_idx ON public.badges USING btree (is_active);


--
-- Name: badges_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX badges_slug_idx ON public.badges USING btree (slug);


--
-- Name: badges_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX badges_slug_key ON public.badges USING btree (slug);


--
-- Name: badges_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX badges_type_idx ON public.badges USING btree (type);


--
-- Name: blacklist_type_value_isActive_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blacklist_type_value_isActive_idx" ON public.blacklist USING btree (type, value, "isActive");


--
-- Name: blacklist_type_value_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX blacklist_type_value_key ON public.blacklist USING btree (type, value);


--
-- Name: blog_bookmarks_postId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_bookmarks_postId_idx" ON public.blog_bookmarks USING btree ("postId");


--
-- Name: blog_bookmarks_postId_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "blog_bookmarks_postId_userId_key" ON public.blog_bookmarks USING btree ("postId", "userId");


--
-- Name: blog_bookmarks_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_bookmarks_userId_idx" ON public.blog_bookmarks USING btree ("userId");


--
-- Name: blog_categories_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX blog_categories_slug_key ON public.blog_categories USING btree (slug);


--
-- Name: blog_comments_parentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_comments_parentId_idx" ON public.blog_comments USING btree ("parentId");


--
-- Name: blog_comments_postId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_comments_postId_idx" ON public.blog_comments USING btree ("postId");


--
-- Name: blog_comments_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_comments_userId_idx" ON public.blog_comments USING btree ("userId");


--
-- Name: blog_drafts_authorId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_drafts_authorId_idx" ON public.blog_drafts USING btree ("authorId");


--
-- Name: blog_drafts_postId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_drafts_postId_idx" ON public.blog_drafts USING btree ("postId");


--
-- Name: blog_drafts_postId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "blog_drafts_postId_key" ON public.blog_drafts USING btree ("postId");


--
-- Name: blog_likes_postId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_likes_postId_idx" ON public.blog_likes USING btree ("postId");


--
-- Name: blog_likes_postId_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "blog_likes_postId_userId_key" ON public.blog_likes USING btree ("postId", "userId");


--
-- Name: blog_likes_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_likes_userId_idx" ON public.blog_likes USING btree ("userId");


--
-- Name: blog_posts_authorId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_posts_authorId_idx" ON public.blog_posts USING btree ("authorId");


--
-- Name: blog_posts_campaignId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_posts_campaignId_idx" ON public.blog_posts USING btree ("campaignId");


--
-- Name: blog_posts_deletedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_posts_deletedAt_idx" ON public.blog_posts USING btree ("deletedAt");


--
-- Name: blog_posts_isFeatured_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_posts_isFeatured_idx" ON public.blog_posts USING btree ("isFeatured");


--
-- Name: blog_posts_projectId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_posts_projectId_idx" ON public.blog_posts USING btree ("projectId");


--
-- Name: blog_posts_publishedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_posts_publishedAt_idx" ON public.blog_posts USING btree ("publishedAt");


--
-- Name: blog_posts_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX blog_posts_slug_idx ON public.blog_posts USING btree (slug);


--
-- Name: blog_posts_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX blog_posts_slug_key ON public.blog_posts USING btree (slug);


--
-- Name: blog_posts_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX blog_posts_status_idx ON public.blog_posts USING btree (status);


--
-- Name: blog_posts_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX blog_posts_type_idx ON public.blog_posts USING btree (type);


--
-- Name: blog_posts_visibility_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX blog_posts_visibility_idx ON public.blog_posts USING btree (visibility);


--
-- Name: blog_reports_commentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_reports_commentId_idx" ON public.blog_reports USING btree ("commentId");


--
-- Name: blog_reports_postId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_reports_postId_idx" ON public.blog_reports USING btree ("postId");


--
-- Name: blog_reports_reporterId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_reports_reporterId_idx" ON public.blog_reports USING btree ("reporterId");


--
-- Name: blog_reports_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX blog_reports_status_idx ON public.blog_reports USING btree (status);


--
-- Name: blog_tags_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX blog_tags_slug_key ON public.blog_tags USING btree (slug);


--
-- Name: blog_versions_postId_versionNumber_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_versions_postId_versionNumber_idx" ON public.blog_versions USING btree ("postId", "versionNumber" DESC);


--
-- Name: blog_versions_postId_versionNumber_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "blog_versions_postId_versionNumber_key" ON public.blog_versions USING btree ("postId", "versionNumber");


--
-- Name: blog_view_logs_postId_viewedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_view_logs_postId_viewedAt_idx" ON public.blog_view_logs USING btree ("postId", "viewedAt" DESC);


--
-- Name: blog_view_logs_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "blog_view_logs_userId_idx" ON public.blog_view_logs USING btree ("userId");


--
-- Name: campaign_blog_links_blogPostId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_blog_links_blogPostId_idx" ON public.campaign_blog_links USING btree ("blogPostId");


--
-- Name: campaign_blog_links_campaignId_blogPostId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "campaign_blog_links_campaignId_blogPostId_key" ON public.campaign_blog_links USING btree ("campaignId", "blogPostId");


--
-- Name: campaign_blog_links_campaignId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_blog_links_campaignId_idx" ON public.campaign_blog_links USING btree ("campaignId");


--
-- Name: campaign_comment_reactions_commentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_comment_reactions_commentId_idx" ON public.campaign_comment_reactions USING btree ("commentId");


--
-- Name: campaign_comment_reactions_commentId_userId_type_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "campaign_comment_reactions_commentId_userId_type_key" ON public.campaign_comment_reactions USING btree ("commentId", "userId", type);


--
-- Name: campaign_comments_campaignId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_comments_campaignId_createdAt_idx" ON public.campaign_comments USING btree ("campaignId", "createdAt" DESC);


--
-- Name: campaign_comments_campaignId_parentId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_comments_campaignId_parentId_createdAt_idx" ON public.campaign_comments USING btree ("campaignId", "parentId", "createdAt");


--
-- Name: campaign_comments_parentId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_comments_parentId_createdAt_idx" ON public.campaign_comments USING btree ("parentId", "createdAt");


--
-- Name: campaign_comments_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaign_comments_status_idx ON public.campaign_comments USING btree (status);


--
-- Name: campaign_comments_userId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_comments_userId_createdAt_idx" ON public.campaign_comments USING btree ("userId", "createdAt" DESC);


--
-- Name: campaign_contents_campaignId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_contents_campaignId_idx" ON public.campaign_contents USING btree ("campaignId");


--
-- Name: campaign_contents_campaignId_isDraft_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "campaign_contents_campaignId_isDraft_key" ON public.campaign_contents USING btree ("campaignId", "isDraft");


--
-- Name: campaign_followers_campaignId_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "campaign_followers_campaignId_email_key" ON public.campaign_followers USING btree ("campaignId", email);


--
-- Name: campaign_followers_campaignId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_followers_campaignId_idx" ON public.campaign_followers USING btree ("campaignId");


--
-- Name: campaign_followers_campaignId_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "campaign_followers_campaignId_userId_key" ON public.campaign_followers USING btree ("campaignId", "userId");


--
-- Name: campaign_followers_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_followers_userId_idx" ON public.campaign_followers USING btree ("userId");


--
-- Name: campaign_reports_campaignId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_reports_campaignId_idx" ON public.campaign_reports USING btree ("campaignId");


--
-- Name: campaign_reports_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaign_reports_status_idx ON public.campaign_reports USING btree (status);


--
-- Name: campaign_reports_targetType_targetId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_reports_targetType_targetId_idx" ON public.campaign_reports USING btree ("targetType", "targetId");


--
-- Name: campaign_reports_targetType_targetId_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "campaign_reports_targetType_targetId_userId_key" ON public.campaign_reports USING btree ("targetType", "targetId", "userId");


--
-- Name: campaign_reports_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_reports_userId_idx" ON public.campaign_reports USING btree ("userId");


--
-- Name: campaign_updates_campaignId_isPinned_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaign_updates_campaignId_isPinned_idx" ON public.campaign_updates USING btree ("campaignId", "isPinned");


--
-- Name: campaign_updates_tags_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaign_updates_tags_idx ON public.campaign_updates USING btree (tags);


--
-- Name: campaigns_campaignCode_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "campaigns_campaignCode_key" ON public.campaigns USING btree ("campaignCode");


--
-- Name: campaigns_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaigns_category_idx ON public.campaigns USING btree (category);


--
-- Name: campaigns_fundingModel_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaigns_fundingModel_idx" ON public.campaigns USING btree ("fundingModel");


--
-- Name: campaigns_isFeatured_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaigns_isFeatured_idx" ON public.campaigns USING btree ("isFeatured");


--
-- Name: campaigns_projectId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "campaigns_projectId_idx" ON public.campaigns USING btree ("projectId");


--
-- Name: campaigns_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX campaigns_slug_key ON public.campaigns USING btree (slug);


--
-- Name: campaigns_tags_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaigns_tags_idx ON public.campaigns USING btree (tags);


--
-- Name: chat_reports_conversationId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "chat_reports_conversationId_idx" ON public.chat_reports USING btree ("conversationId");


--
-- Name: chat_reports_reporterId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "chat_reports_reporterId_idx" ON public.chat_reports USING btree ("reporterId");


--
-- Name: chat_reports_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX chat_reports_status_idx ON public.chat_reports USING btree (status);


--
-- Name: checkout_sessions_campaignId_rewardId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "checkout_sessions_campaignId_rewardId_idx" ON public.checkout_sessions USING btree ("campaignId", "rewardId");


--
-- Name: checkout_sessions_expiresAt_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "checkout_sessions_expiresAt_status_idx" ON public.checkout_sessions USING btree ("expiresAt", status);


--
-- Name: checkout_sessions_userId_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "checkout_sessions_userId_status_idx" ON public.checkout_sessions USING btree ("userId", status);


--
-- Name: conversations_conversationKey_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "conversations_conversationKey_key" ON public.conversations USING btree ("conversationKey");


--
-- Name: conversations_participantIds_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "conversations_participantIds_idx" ON public.conversations USING btree ("participantIds");


--
-- Name: conversations_updatedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "conversations_updatedAt_idx" ON public.conversations USING btree ("updatedAt" DESC);


--
-- Name: daily_tip_invoices_invoiceDate_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "daily_tip_invoices_invoiceDate_key" ON public.daily_tip_invoices USING btree ("invoiceDate");


--
-- Name: donation_certificates_backerUserId_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "donation_certificates_backerUserId_status_idx" ON public.donation_certificates USING btree ("backerUserId", status);


--
-- Name: donation_certificates_campaignId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "donation_certificates_campaignId_idx" ON public.donation_certificates USING btree ("campaignId");


--
-- Name: donation_certificates_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX donation_certificates_code_key ON public.donation_certificates USING btree (code);


--
-- Name: donation_certificates_creatorId_flowType_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "donation_certificates_creatorId_flowType_idx" ON public.donation_certificates USING btree ("creatorId", "flowType");


--
-- Name: donation_certificates_guestEmail_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "donation_certificates_guestEmail_idx" ON public.donation_certificates USING btree ("guestEmail");


--
-- Name: donation_certificates_pledgeId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "donation_certificates_pledgeId_key" ON public.donation_certificates USING btree ("pledgeId");


--
-- Name: kyc_info_idCardNumber_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "kyc_info_idCardNumber_key" ON public.kyc_info USING btree ("idCardNumber");


--
-- Name: kyc_info_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "kyc_info_userId_key" ON public.kyc_info USING btree ("userId");


--
-- Name: message_reactions_messageId_emoji_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "message_reactions_messageId_emoji_key" ON public.message_reactions USING btree ("messageId", emoji);


--
-- Name: message_reactions_messageId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "message_reactions_messageId_idx" ON public.message_reactions USING btree ("messageId");


--
-- Name: messages_conversationId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "messages_conversationId_createdAt_idx" ON public.messages USING btree ("conversationId", "createdAt" DESC);


--
-- Name: messages_senderId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "messages_senderId_idx" ON public.messages USING btree ("senderId");


--
-- Name: notifications_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "notifications_createdAt_idx" ON public.notifications USING btree ("createdAt");


--
-- Name: notifications_userId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "notifications_userId_createdAt_idx" ON public.notifications USING btree ("userId", "createdAt" DESC);


--
-- Name: notifications_userId_isRead_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "notifications_userId_isRead_idx" ON public.notifications USING btree ("userId", "isRead");


--
-- Name: password_reset_tokens_expiresAt_usedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "password_reset_tokens_expiresAt_usedAt_idx" ON public.password_reset_tokens USING btree ("expiresAt", "usedAt");


--
-- Name: password_reset_tokens_tokenHash_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "password_reset_tokens_tokenHash_key" ON public.password_reset_tokens USING btree ("tokenHash");


--
-- Name: password_reset_tokens_userId_expiresAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "password_reset_tokens_userId_expiresAt_idx" ON public.password_reset_tokens USING btree ("userId", "expiresAt");


--
-- Name: payment_methods_provider_providerMethodRef_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "payment_methods_provider_providerMethodRef_idx" ON public.payment_methods USING btree (provider, "providerMethodRef");


--
-- Name: payment_methods_userId_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "payment_methods_userId_status_idx" ON public.payment_methods USING btree ("userId", status);


--
-- Name: platform_invoices_invoiceNumber_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "platform_invoices_invoiceNumber_key" ON public.platform_invoices USING btree ("invoiceNumber");


--
-- Name: pledges_payosOrderCode_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "pledges_payosOrderCode_key" ON public.pledges USING btree ("payosOrderCode");


--
-- Name: pledges_transactionId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "pledges_transactionId_key" ON public.pledges USING btree ("transactionId");


--
-- Name: product_reviews_pledgeId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "product_reviews_pledgeId_key" ON public.product_reviews USING btree ("pledgeId");


--
-- Name: product_reviews_rewardId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "product_reviews_rewardId_createdAt_idx" ON public.product_reviews USING btree ("rewardId", "createdAt");


--
-- Name: product_reviews_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "product_reviews_userId_idx" ON public.product_reviews USING btree ("userId");


--
-- Name: profile_customization_versions_customizationId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "profile_customization_versions_customizationId_createdAt_idx" ON public.profile_customization_versions USING btree ("customizationId", "createdAt");


--
-- Name: profile_customization_versions_customizationId_version_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "profile_customization_versions_customizationId_version_key" ON public.profile_customization_versions USING btree ("customizationId", version);


--
-- Name: profile_customizations_updatedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "profile_customizations_updatedAt_idx" ON public.profile_customizations USING btree ("updatedAt");


--
-- Name: profile_customizations_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "profile_customizations_userId_key" ON public.profile_customizations USING btree ("userId");


--
-- Name: project_blog_links_blogPostId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "project_blog_links_blogPostId_idx" ON public.project_blog_links USING btree ("blogPostId");


--
-- Name: project_blog_links_projectId_blogPostId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "project_blog_links_projectId_blogPostId_key" ON public.project_blog_links USING btree ("projectId", "blogPostId");


--
-- Name: project_blog_links_projectId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "project_blog_links_projectId_idx" ON public.project_blog_links USING btree ("projectId");


--
-- Name: project_reward_links_projectId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "project_reward_links_projectId_idx" ON public.project_reward_links USING btree ("projectId");


--
-- Name: project_reward_links_projectId_rewardId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "project_reward_links_projectId_rewardId_key" ON public.project_reward_links USING btree ("projectId", "rewardId");


--
-- Name: project_reward_links_rewardId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "project_reward_links_rewardId_idx" ON public.project_reward_links USING btree ("rewardId");


--
-- Name: projects_creatorId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "projects_creatorId_idx" ON public.projects USING btree ("creatorId");


--
-- Name: projects_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX projects_slug_idx ON public.projects USING btree (slug);


--
-- Name: projects_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX projects_slug_key ON public.projects USING btree (slug);


--
-- Name: reward_digital_assets_campaignId_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "reward_digital_assets_campaignId_status_idx" ON public.reward_digital_assets USING btree ("campaignId", status);


--
-- Name: reward_digital_assets_pledgeId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "reward_digital_assets_pledgeId_key" ON public.reward_digital_assets USING btree ("pledgeId");


--
-- Name: reward_digital_assets_rewardId_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "reward_digital_assets_rewardId_status_idx" ON public.reward_digital_assets USING btree ("rewardId", status);


--
-- Name: rewards_campaignId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "rewards_campaignId_idx" ON public.rewards USING btree ("campaignId");


--
-- Name: rewards_projectId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "rewards_projectId_idx" ON public.rewards USING btree ("projectId");


--
-- Name: transaction_limits_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "transaction_limits_userId_key" ON public.transaction_limits USING btree ("userId");


--
-- Name: user_badges_assigned_by_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_badges_assigned_by_idx ON public.user_badges USING btree (assigned_by);


--
-- Name: user_badges_badge_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_badges_badge_id_idx ON public.user_badges USING btree (badge_id);


--
-- Name: user_badges_revoked_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_badges_revoked_at_idx ON public.user_badges USING btree (revoked_at);


--
-- Name: user_badges_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_badges_user_id_idx ON public.user_badges USING btree (user_id);


--
-- Name: user_metadata_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "user_metadata_userId_key" ON public.user_metadata USING btree ("userId");


--
-- Name: user_notes_targetUserId_expiresAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "user_notes_targetUserId_expiresAt_idx" ON public.user_notes USING btree ("targetUserId", "expiresAt");


--
-- Name: user_notes_userId_expiresAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "user_notes_userId_expiresAt_idx" ON public.user_notes USING btree ("userId", "expiresAt");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: _blog_postsTorewards _blog_postsTorewards_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_blog_postsTorewards"
    ADD CONSTRAINT "_blog_postsTorewards_A_fkey" FOREIGN KEY ("A") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _blog_postsTorewards _blog_postsTorewards_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_blog_postsTorewards"
    ADD CONSTRAINT "_blog_postsTorewards_B_fkey" FOREIGN KEY ("B") REFERENCES public.rewards(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: audit_logs audit_logs_entityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT "audit_logs_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES public.pledges(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: audit_logs audit_logs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: backer_invoices backer_invoices_pledgeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.backer_invoices
    ADD CONSTRAINT "backer_invoices_pledgeId_fkey" FOREIGN KEY ("pledgeId") REFERENCES public.pledges(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: badges badges_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: blog_bookmarks blog_bookmarks_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_bookmarks
    ADD CONSTRAINT "blog_bookmarks_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_bookmarks blog_bookmarks_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_bookmarks
    ADD CONSTRAINT "blog_bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_comments blog_comments_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT "blog_comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.blog_comments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_comments blog_comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT "blog_comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_comments blog_comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT "blog_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_drafts blog_drafts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_drafts
    ADD CONSTRAINT "blog_drafts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_likes blog_likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_likes
    ADD CONSTRAINT "blog_likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_likes blog_likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_likes
    ADD CONSTRAINT "blog_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_post_categories blog_post_categories_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_categories
    ADD CONSTRAINT "blog_post_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.blog_categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_post_categories blog_post_categories_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_categories
    ADD CONSTRAINT "blog_post_categories_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_post_tags blog_post_tags_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_tags
    ADD CONSTRAINT "blog_post_tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_post_tags blog_post_tags_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_tags
    ADD CONSTRAINT "blog_post_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.blog_tags(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_posts blog_posts_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT "blog_posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_posts blog_posts_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT "blog_posts_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_posts blog_posts_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT "blog_posts_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: blog_reports blog_reports_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_reports
    ADD CONSTRAINT "blog_reports_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_reports blog_reports_reporterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_reports
    ADD CONSTRAINT "blog_reports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_versions blog_versions_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_versions
    ADD CONSTRAINT "blog_versions_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blog_view_logs blog_view_logs_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_view_logs
    ADD CONSTRAINT "blog_view_logs_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_blog_links campaign_blog_links_blogPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_blog_links
    ADD CONSTRAINT "campaign_blog_links_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_blog_links campaign_blog_links_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_blog_links
    ADD CONSTRAINT "campaign_blog_links_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_comment_reactions campaign_comment_reactions_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_comment_reactions
    ADD CONSTRAINT "campaign_comment_reactions_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public.campaign_comments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_comment_reactions campaign_comment_reactions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_comment_reactions
    ADD CONSTRAINT "campaign_comment_reactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_comments campaign_comments_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_comments
    ADD CONSTRAINT "campaign_comments_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_comments campaign_comments_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_comments
    ADD CONSTRAINT "campaign_comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.campaign_comments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_comments campaign_comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_comments
    ADD CONSTRAINT "campaign_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_contents campaign_contents_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_contents
    ADD CONSTRAINT "campaign_contents_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_followers campaign_followers_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_followers
    ADD CONSTRAINT "campaign_followers_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_followers campaign_followers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_followers
    ADD CONSTRAINT "campaign_followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_reports campaign_reports_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_reports
    ADD CONSTRAINT "campaign_reports_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_reports campaign_reports_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_reports
    ADD CONSTRAINT "campaign_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campaign_updates campaign_updates_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_updates
    ADD CONSTRAINT "campaign_updates_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: campaigns campaigns_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT "campaigns_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: campaigns campaigns_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT "campaigns_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: chat_reports chat_reports_conversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chat_reports
    ADD CONSTRAINT "chat_reports_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public.conversations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: checkout_sessions checkout_sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checkout_sessions
    ADD CONSTRAINT "checkout_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: donation_certificates donation_certificates_backerUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donation_certificates
    ADD CONSTRAINT "donation_certificates_backerUserId_fkey" FOREIGN KEY ("backerUserId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: donation_certificates donation_certificates_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donation_certificates
    ADD CONSTRAINT "donation_certificates_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: donation_certificates donation_certificates_claimedByUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donation_certificates
    ADD CONSTRAINT "donation_certificates_claimedByUserId_fkey" FOREIGN KEY ("claimedByUserId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: donation_certificates donation_certificates_pledgeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donation_certificates
    ADD CONSTRAINT "donation_certificates_pledgeId_fkey" FOREIGN KEY ("pledgeId") REFERENCES public.pledges(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: kyc_info kyc_info_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kyc_info
    ADD CONSTRAINT "kyc_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: message_reactions message_reactions_messageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message_reactions
    ADD CONSTRAINT "message_reactions_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES public.messages(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: messages messages_conversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public.conversations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notifications notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: password_reset_tokens password_reset_tokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT "password_reset_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment_methods payment_methods_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_methods
    ADD CONSTRAINT "payment_methods_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: platform_invoices platform_invoices_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform_invoices
    ADD CONSTRAINT "platform_invoices_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: platform_invoices platform_invoices_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform_invoices
    ADD CONSTRAINT "platform_invoices_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: pledges pledges_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pledges
    ADD CONSTRAINT "pledges_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: pledges pledges_rewardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pledges
    ADD CONSTRAINT "pledges_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES public.rewards(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: pledges pledges_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pledges
    ADD CONSTRAINT "pledges_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: product_reviews product_reviews_pledgeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_reviews
    ADD CONSTRAINT "product_reviews_pledgeId_fkey" FOREIGN KEY ("pledgeId") REFERENCES public.pledges(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_reviews product_reviews_rewardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_reviews
    ADD CONSTRAINT "product_reviews_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES public.rewards(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_reviews product_reviews_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_reviews
    ADD CONSTRAINT "product_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: profile_customization_versions profile_customization_versions_customizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile_customization_versions
    ADD CONSTRAINT "profile_customization_versions_customizationId_fkey" FOREIGN KEY ("customizationId") REFERENCES public.profile_customizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: profile_customizations profile_customizations_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile_customizations
    ADD CONSTRAINT "profile_customizations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_blog_links project_blog_links_blogPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_blog_links
    ADD CONSTRAINT "project_blog_links_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES public.blog_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_blog_links project_blog_links_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_blog_links
    ADD CONSTRAINT "project_blog_links_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_reward_links project_reward_links_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_reward_links
    ADD CONSTRAINT "project_reward_links_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_reward_links project_reward_links_rewardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_reward_links
    ADD CONSTRAINT "project_reward_links_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES public.rewards(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: projects projects_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT "projects_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reviews reviews_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "reviews_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: reviews reviews_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: reward_digital_assets reward_digital_assets_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reward_digital_assets
    ADD CONSTRAINT "reward_digital_assets_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: reward_digital_assets reward_digital_assets_pledgeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reward_digital_assets
    ADD CONSTRAINT "reward_digital_assets_pledgeId_fkey" FOREIGN KEY ("pledgeId") REFERENCES public.pledges(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: reward_digital_assets reward_digital_assets_rewardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reward_digital_assets
    ADD CONSTRAINT "reward_digital_assets_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES public.rewards(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: rewards rewards_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT "rewards_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public.campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: rewards rewards_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT "rewards_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_badges user_badges_assigned_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_assigned_by_fkey FOREIGN KEY (assigned_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_badges user_badges_badge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_badge_id_fkey FOREIGN KEY (badge_id) REFERENCES public.badges(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_badges user_badges_revoked_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_revoked_by_fkey FOREIGN KEY (revoked_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_badges user_badges_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_metadata user_metadata_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_metadata
    ADD CONSTRAINT "user_metadata_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_notes user_notes_targetUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_notes
    ADD CONSTRAINT "user_notes_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_notes user_notes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_notes
    ADD CONSTRAINT "user_notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict zjL7vuXVBOMqJw8Y9WbrXn3vI0aVEuiKiQTqhddJe0Dim6GfajeTnZoZ2C9U30G

